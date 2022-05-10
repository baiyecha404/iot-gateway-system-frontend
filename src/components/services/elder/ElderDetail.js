import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Typography, Box, Container, Button, Avatar, Card, CardHeader, CardContent, Divider, Tooltip,
    Chip, Tab
} from "@mui/material";
import { TabList, TabContext, TabPanel } from "@mui/lab";
import EditIcon from '@mui/icons-material/Edit';
import ElderInfo from "./ElderInfo";
import ElderLocation from "./ElderLocation";
import ElderLog from "./ElderLog";
import ElderService from '../../../api/Elder';
import ElderNotification from "./ElderNotification";

export default function ElderDetail(props) {
    const { elderId } = props
    const { tab } = useParams();
    const [info, setInfo] = useState({})
    const [currentTab, setCurrentTab] = useState("info");
    const navigate = useNavigate()

    useEffect(() => {
        const tabs = ["info", "location", "logs", "notification"];
        if (tab && tabs.includes(tab)) {
            setCurrentTab(tab);
        }
    }, [tab])


    useEffect(() => {
        ElderService.getElderInfo(elderId).then(resp => {
            if (resp.result) {
                setInfo(resp.result);
            }
        })
    }, [])


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
                                    <Tab label="位置" value="location" />
                                    <Tab label="记录" value="logs" />
                                    <Tab label="通知" value="notification" />
                                </TabList>
                                <TabPanel value="info">
                                    <ElderInfo elderId={elderId}
                                        info={info} />
                                </TabPanel>
                                <TabPanel value="location">
                                    <ElderLocation elderId={elderId} />
                                </TabPanel>
                                <TabPanel value="logs">
                                    <ElderLog />
                                </TabPanel>
                                <TabPanel value="notification">
                                    <ElderNotification />
                                </TabPanel>
                            </TabContext>
                        </Box>
                    </Box>


                </Container>
            </Box>
        </React.Fragment>
    )
} 
