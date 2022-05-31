import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Grid, Card, CardContent, CardHeader, Typography, List, ListItem, ListItemText, Divider, MenuItem,
    TextField, Link
} from '@mui/material';
import ReactECharts from "echarts-for-react";
import ChannelMapStatus from '../../channel/ChannelMapStatus';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import DeviceService from '../../../api/Device';


export default function ElderStatusCard(props) {
    const { deviceId } = props;
    const originialAttribute = {
        name: "",
        identifier: "",
        definition: "",
        messages: []
    }
    const [attribute, setAttribute] = useState(originialAttribute);
    const [messages, setMessages] = useState([]);
    const [attributeMessages, setAttributeMessages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        DeviceService.getDeviceMessages(deviceId).then(resp => {
            if (resp.result) {
                setAttributeMessages(resp.result);
            }
        })
        return () => setAttributeMessages([]);
    }, [deviceId])

    const handleSelectedAttribute = (event) => {
        const attribute = attributeMessages.find(attr => attr.identifier === event.target.value)
        setAttribute(attribute)
        setMessages(attribute.messages.sort((x, y) => new Date(x.created_at) - new Date(y.created_at)))
    }


    const getLatestValue = (messages) => {
        const len = messages.length;
        if (len) {
            let data = JSON.parse(messages[len - 1].data);
            return `${data.data} ${data.unit ? data.unit : ""}`
        }
    }

    const getAttributeChannel = (messages) => {
        const len = messages.length
        if (len) {
            let channelId = messages[len - 1].channel_id;
            return (<Link onClick={e => navigate(`/channels/${channelId}/messages`, { reaplce: true })} underline="always">
                {channelId}
            </Link>)
        }
    }


    const renderChart = (deviceMessages) => {

        let showedMessages = deviceMessages;

        if (showedMessages.length > 10) {
            showedMessages = showedMessages.slice(deviceMessages.length - 10, deviceMessages.length)
        }


        if (showedMessages.length) {
            const data = JSON.parse(showedMessages[0].data)
            if (data.name === "geolocation") {
                return (
                    <ChannelMapStatus
                        messages={deviceMessages}
                    />
                )
            } else {
                let dataName;

                const handleMessageData = (message) => {
                    let data = JSON.parse(message.data);
                    if (!dataName) {
                        dataName = data.name
                    }
                    if (data.data_type === "bool") {
                        return data.data === "on" ? 1 : -1
                    }
                    return data.data;
                }


                const resultData = deviceMessages.map((message) => handleMessageData(message))
                const dates = deviceMessages.map(message => message.created_at)

                const option = {
                    title: {
                        text: '消息'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: [dataName]
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: dates
                    },
                    yAxis: {
                        type: 'value',
                    },
                    series: [
                        {
                            name: dataName,
                            type: 'line',
                            stack: 'Total',
                            data: resultData,
                            smooth: true
                        }
                    ]
                }

                return (
                    <ReactECharts
                        option={option}
                        style={{ height: 200 }}
                    />
                )
            }
        }
    }

    return (
        <React.Fragment>
            <Card>
                <CardHeader
                    title="设备状态"
                    subheader={`设备ID: ${deviceId}`}
                    avatar={<DevicesOtherIcon />}
                    sx={{
                        height: 60,
                    }}
                />
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item md={6} xs={12}>
                            <TextField
                                id={`${deviceId}-attribute`}
                                label="Attributes"
                                fullWidth
                                select
                                value={attribute.identifier}
                                onChange={handleSelectedAttribute}
                                placeholder="Select attribute"
                            >
                                {attributeMessages.map((attr) => (
                                    <MenuItem key={attr.identifier} value={attr.identifier}>
                                        {attr.name} ( {attr.identifier} )
                                    </MenuItem>
                                ))}
                            </TextField>
                            {attributeMessages.length === 0 ? (
                                <Grid
                                    container
                                    spacing={0}
                                    direction="column"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Grid item xs={3} sx={{ my: 2 }}>
                                        <Typography variant="h6" >No Messages</Typography>
                                    </Grid>

                                </Grid>
                            ) : <List disablePadding>
                                <ListItem sx={{ py: 1, px: 0, width: 360 }}>
                                    <ListItemText primary={<Typography variant="body2" fontWeight="bold">属性名</Typography>} />
                                    <Typography variant="body2">{attribute.name}</Typography>
                                </ListItem>
                                <Divider />
                                <ListItem sx={{ py: 1, px: 0, width: 360 }}>
                                    <ListItemText primary={<Typography variant="body2" fontWeight="bold">标识符</Typography>} />
                                    <Typography variant="body2">{attribute.identifier}</Typography>
                                </ListItem>
                                <Divider />
                                <ListItem sx={{ py: 1, px: 0, width: 420 }}>
                                    <ListItemText primary={<Typography variant="body2" fontWeight="bold">描述</Typography>} />
                                    <Typography variant="body2">{attribute.definition}</Typography>
                                </ListItem>
                                <Divider />
                                <ListItem sx={{ py: 1, px: 0, width: 420 }}>
                                    <ListItemText primary={<Typography variant="body2" fontWeight="bold">信道</Typography>} />
                                    <Typography variant="body2">{getAttributeChannel(attribute.messages)}</Typography>
                                </ListItem>
                                <Divider />
                                <ListItem sx={{ py: 1, px: 0, width: 360 }}>
                                    <ListItemText primary={<Typography variant="body2" fontWeight="bold">最新数值</Typography>} />
                                    <Typography variant="body2">{getLatestValue(attribute.messages)}</Typography>
                                </ListItem>
                            </List>}
                        </Grid>
                        <Grid item md={6} xs={12}>
                            {attributeMessages.length === 0 ? (
                                <Grid
                                    container
                                    spacing={0}
                                    direction="column"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Grid item xs={3} sx={{ my: 3 }}>
                                        <Typography variant="h6" >No Status Shown</Typography>
                                    </Grid>
                                </Grid>
                            ) : (
                                <React.Fragment>
                                    {renderChart(attribute.messages)}
                                </React.Fragment>
                            )}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}