import React, { useState, useEffect } from 'react';
import ChannelService from '../../api/Channel';
import ReactECharts from "echarts-for-react";
import ChannelMapStatus from './ChannelMapStatus';


export default function ChannelStatus(props) {
    const { channelId } = props;
    const [messages, setMessages] = useState([]);

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

    useEffect(() => {
        ChannelService.getMessages(channelId).then(resp => {
            if (resp.result) {
                setMessages(resp.result)
            }
        })
        return () => setMessages([]);
    }, [channelId])


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
                        style={{ height: 300 }}
                    />
                )
            }
        }
    }


    const deviceMessages = messages
    .filter(message => uuidRegex.test(message.sender))
    .sort((x, y) => new Date(x.created_at) - new Date(y.created_at))

    return (
        <React.Fragment>
            {renderChart(deviceMessages)}
        </React.Fragment>
    )
}