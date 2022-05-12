import React, { useState, useEffect, useContext } from "react";
import { MessageContext } from "../DashBoard";
import { useParams, useNavigate } from "react-router-dom";
import {
    Container, Box, Card, CardHeader, IconButton, Divider, CardContent, Button, Tab,
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Tooltip
} from "@mui/material";
import { TabList, TabContext, TabPanel } from "@mui/lab";
import LooksIcon from '@mui/icons-material/Looks';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import ChannelInfo from "./ChannelInfo";
import ChannelMessage from "./ChannelMessage";
import ChannelStatus from "./ChannelStatus";
import ChannelService from '../../api/Channel';

export default function ChannelDetail(props) {
    const { setSuccess, setError } = useContext(MessageContext)
    const { channelId } = props;
    const [openDialog, setOpenDialog] = useState(false);
    const [currentTab, setCurrentTab] = useState('info');
    const navigate = useNavigate()
    const { tab } = useParams();

    useEffect(() => {
        const tabs = ["info", "messages", "status"];
        if (tab && tabs.includes(tab)) {
            setCurrentTab(tab);
        }
    }, [tab])


    const handleChange = (event, newValue) => {
        navigate(`/channels/${channelId}/${newValue}`, { replace: true });
    };

    const handleClose = (event) => {
        setOpenDialog(false);
    }

    const handleDelete = (event) => {
        setOpenDialog(true);
    }


    const deleteChannel = (event) => {
        ChannelService.deleteChannel(channelId).then(resp => {
            if (resp.result) {
                setOpenDialog(false);
                setSuccess("Successfully deleted channel");
                navigate('/channels', { replace: true })
            } else {
                setError("Error deleting channel");
            }
        })
    }

    return (
        <React.Fragment>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="bg">
                    <Card>
                        <CardHeader
                            title="信道信息"
                            subheader={`Id: ${channelId}`}
                            avatar={<LooksIcon />}
                            sx={{
                                height: 100,
                            }}
                            action={
                                (
                                    <React.Fragment>
                                        <Tooltip title="go back to channels">
                                            <IconButton aria-label="settings" onClick={e => navigate('/channels', { replace: true })}>
                                                <ArrowBackIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="delete channel">
                                            <IconButton aria-label="x" onClick={handleDelete}>
                                                <DeleteIcon color="error" />
                                            </IconButton>
                                        </Tooltip>
                                    </React.Fragment>
                                )
                            }
                        />
                        <Divider />
                        <CardContent>
                            <TabContext value={currentTab}>
                                <TabList
                                    onChange={handleChange}
                                    textColor="primary"
                                    indicatorColor="primary"
                                    aria-label="secondary tabs example"
                                >
                                    <Tab label="配置" value="info" />
                                    <Tab label="消息" value="messages" />
                                    <Tab label="状态" value="status" />
                                </TabList>
                                <TabPanel value="info">
                                    <ChannelInfo channelId={channelId} />
                                </TabPanel>
                                <TabPanel value="messages">
                                    <ChannelMessage
                                        channelId={channelId}
                                    />
                                </TabPanel>
                                <TabPanel value="status">
                                    <ChannelStatus
                                        channelId={channelId}
                                    />
                                </TabPanel>
                            </TabContext>
                        </CardContent>
                    </Card>
                    <Dialog
                        open={openDialog}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Are you sure to delete this channel?"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                如点击确认, 该channel(channel Id: {channelId})及历史信息都将被删除。
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>返回</Button>
                            <Button onClick={deleteChannel} autoFocus>
                                确认
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Container>
            </Box>
        </React.Fragment >
    )
}