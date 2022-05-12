import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Typography, Box, Container, Button, Avatar, Card, CardHeader, CardContent, Divider, Tooltip,
    Chip, Tab
} from "@mui/material";
import { TabList, TabContext, TabPanel } from "@mui/lab";
import EditIcon from '@mui/icons-material/Edit';
import ElderService from '../../../api/Elder';
import ElderInfo from "./ElderInfo";
import ElderLog from "./ElderLog";
import ElderNotification from "./ElderNotification";
import ElderEditInfo from "./ElderEditInfo";
import ElderStatus from "./ElderStatus";

export default function ElderDetail(props) {
    const { elderId } = props
    const { tab } = useParams();
    const [info, setInfo] = useState({})
    const [shouldUpdate, setShouldUpdate] = useState(true)
    const [devices, setDevices] = useState([]);
    const [currentTab, setCurrentTab] = useState("info");
    const navigate = useNavigate()

    useEffect(() => {
        const tabs = ["info", "logs", "status", "notification", "edit"];
        if (tab && tabs.includes(tab)) {
            setCurrentTab(tab);
        }
    }, [tab])


    useEffect(() => {
        if (shouldUpdate) {
            ElderService.getElderInfo(elderId).then(resp => {
                if (resp.result) {
                    setInfo(resp.result);
                }
            })
                .then(() => {
                    ElderService.getElderDevices(elderId).then(resp => {
                        if (resp.result) {
                            setDevices(resp.result);
                        }
                    })
                })
                .then(() => {
                    setShouldUpdate(false);
                })
        }
        return () => setShouldUpdate(false);
    }, [elderId, shouldUpdate])


    const handleChange = (event, newValue) => {
        navigate(`/elder-caring/${elderId}/${newValue}`, { replace: true });
    };


    return (
        <React.Fragment>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 3
                }}
            >
                <Container maxWidth={false}>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            m: -1
                        }}
                    >
                        <Typography
                            sx={{ m: 1 }}
                            variant="h4"
                        >
                            The Elder
                        </Typography>
                    </Box>
                    <Box sx={{ my: 3 }}>
                        <Card sx={{
                            backgroundColor: (theme) => theme.palette.grey[100]
                        }}>
                            <CardHeader
                                title={<Typography variant="h5" gutterBottom>{info.name}</Typography>}
                                subheader={<Chip label={`Id: ${elderId}`} />}
                                avatar={<Avatar sx={{ width: 48, height: 48 }} />}
                                sx={{
                                    height: 120,
                                }}
                                action={
                                    (
                                        <React.Fragment>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'flex-end',
                                                    p: 1,
                                                    flexWrap: 'wrap',
                                                }}
                                            >
                                                <Box >
                                                    <Button
                                                        endIcon={<EditIcon />}
                                                        color="primary"
                                                        variant="outlined"
                                                        sx={{ ml: 4, mr: 1 }}
                                                        onClick={e => navigate(`/elder-caring/${elderId}/edit`, { replace: true })}
                                                    >
                                                        编辑
                                                    </Button>
                                                    <Tooltip title="actions">
                                                        <Button
                                                            color="primary"
                                                            variant="contained"
                                                            sx={{ mr: 1 }}
                                                        >
                                                            操作
                                                        </Button>
                                                    </Tooltip>
                                                </Box>
                                            </Box>
                                        </React.Fragment>
                                    )
                                }
                            />
                        </Card>
                        <Box sx={{ my: 1 }}>
                            <TabContext value={currentTab}>
                                <TabList
                                    onChange={handleChange}
                                    textColor="primary"
                                    indicatorColor="primary"
                                    aria-label="secondary tabs example"
                                >
                                    <Tab label="信息" value="info" />
                                    <Tab label="记录" value="logs" />
                                    <Tab label="状态" value="status" />
                                    <Tab label="通知" value="notification" />
                                    <Tab value="edit" hidden={true} />
                                </TabList>
                                <TabPanel value="info">
                                    <ElderInfo
                                        elderId={elderId}
                                        info={info}
                                        devices={devices}
                                        setUpdate={setShouldUpdate}
                                    />
                                </TabPanel>
                                <TabPanel value="logs">
                                    <ElderLog />
                                </TabPanel>
                                <TabPanel value="status">
                                    <ElderStatus devices={devices}/>
                                </TabPanel>
                                <TabPanel value="notification">
                                    <ElderNotification />
                                </TabPanel>
                                <TabPanel value="edit">
                                    <ElderEditInfo
                                        elderId={elderId}
                                        setUpdate={setShouldUpdate}
                                        info={info}
                                    />
                                </TabPanel>
                            </TabContext>
                        </Box>
                    </Box>


                </Container>
            </Box>
        </React.Fragment>
    )
} 
