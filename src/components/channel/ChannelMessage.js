import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MessageContext } from "../DashBoard";
import {
    Grid, List, ListSubheader, ListItemButton, ListItemText, Typography, IconButton, Dialog,
    DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField, MenuItem,
    Avatar, Box, Divider
} from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import DevicesIcon from '@mui/icons-material/Devices';
import MoreTimeOutlinedIcon from '@mui/icons-material/MoreTimeOutlined';
import ChannelService from '../../api/Channel';
import DeviceService from '../../api/Device';

export default function ChannelMessage(props) {
    const { channelId } = props;
    const { setSuccess, setError } = useContext(MessageContext)
    const actions = ["ping", "get", "set", "on/off", "control"];
    const [isSelected, setIsSelected] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [deviceAttributes, setDeviceAttributes] = useState([]);
    const [senders, setSenders] = useState([]);
    const [connections, setConnections] = useState([])
    const [shouldUpdate, setShouldUpdate] = useState(true);
    const [sender, setSender] = useState("all");
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState({
        attribute: "",
        action: "",
        value: ""
    });
    const navigate = useNavigate();

    useEffect(() => {
        ChannelService.getConnections(channelId).then(resp => {
            if (resp.result) {
                setConnections(resp.result);
            }
        })
    }, [channelId])


    useEffect(() => {
        if (shouldUpdate) {
            ChannelService.getMessages(channelId).then(resp => {
                if (resp.result) {
                    setMessages(resp.result)
                }
            }).then(() => {
                setShouldUpdate(false);
            })
        }
        return () => setShouldUpdate(false);
    }, [channelId, shouldUpdate])

    useEffect(() => {
        const groupBy = function (xs, key) {
            return xs.reduce((rv, x) => {
                (rv[x[key]] = rv[x[key]] || []).push(x);
                return rv;
            }, {});
        };
        const allSenders = Object.keys(groupBy(messages, "sender")).concat(["all"])
        setSenders(allSenders)
    }, [messages])


    const handleMessageSent = (device_id) => {
        setDialogOpen(false);
        ChannelService.sendMessage(channelId, device_id, message).then(resp => {
            if (resp.result) {
                setSuccess("Message sent successfully");
                return true;
            }
            if (resp.err) {
                setError(resp.err);
            }
        }).then(res => {
            if (res) {
                setShouldUpdate(true);
            }
        })
    }


    const handleConnectionClick = (device_id) => {
        setIsSelected(device_id)
    }


    const handleMessageForm = (device_id) => {
        DeviceService.getDeviceAttributes(device_id).then(resp => {
            if (resp.result) {
                setDeviceAttributes(resp.result);
            }
        }).then(() => {
            setDialogOpen(true);
        })
    }

    const startCronJob = (device_id) => {
        ChannelService.startCronJob(channelId, device_id).then(resp => {
            if (resp.result) {
                setSuccess("Cron job started successfully");
                return true;
            }
            if (resp.err) {
                setError(resp.err);
            }
        }).then(res => {
            if (res) {
                setShouldUpdate(true);
            }
        })
    }


    return (
        <React.Fragment>
            <Grid
                container
                spacing={3}
                wrap="wrap"
            >
                <Grid
                    md={4}
                    sm={4}
                    xs={12}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                    item>
                    <Box>
                        <List
                            sx={{
                                width: '100%', maxWidth: 400, maxHeight: 200, bgcolor: 'background.paper',
                                overflow: 'auto',
                            }}
                            subheader={
                                <ListSubheader>
                                    <Typography variant="h6">连接</Typography>
                                </ListSubheader>}
                        >
                            {connections.length === 0 && <ListItemButton
                            >                                     <ListItemText
                                    primary={<Typography variant="h6">没有连接</Typography>}
                                />

                            </ListItemButton>}
                            {connections.map((connection) => (
                                <div key={connection.device_id}>
                                    <ListItemButton
                                        onClick={e => handleConnectionClick(connection.device_id)}
                                        selected={isSelected === connection.device_id}
                                    >
                                        <ListItemText
                                            primary={connection.device}
                                            secondary={connection.device_id}
                                            onClick={e => navigate(`/devices/${connection.device_id}`, { replace: true })}
                                        />
                                        <IconButton aria-label="cronjob"
                                            onClick={e => startCronJob(connection.device_id)}>
                                            <MoreTimeOutlinedIcon />
                                        </IconButton>
                                        <IconButton edge="end" aria-label="comments"
                                            onClick={e => handleMessageForm(connection.device_id)}>
                                            <CommentIcon />
                                        </IconButton>
                                    </ListItemButton>
                                    <Dialog open={dialogOpen} onClose={e => setDialogOpen(false)}
                                        fullWidth
                                        maxWidth={'sm'}>
                                        <DialogTitle>Send Messages</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>
                                                请选择你要发送的消息,或自定义消息
                                            </DialogContentText>
                                            <Grid container wrap="wrap" spacing={3}>
                                                <Grid xs={12} item>
                                                    <TextField
                                                        id="type"
                                                        margin="dense"
                                                        label="Type"
                                                        fullWidth
                                                        select
                                                        variant="standard"
                                                        value={message.attribute}
                                                        onChange={e => setMessage({ ...message, attribute: e.target.value })}
                                                    >
                                                        {deviceAttributes.map((attr) => (
                                                            <MenuItem key={attr.identifier} value={attr.identifier}>
                                                                {attr.name} ( {attr.identifier} )
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                </Grid>
                                                <Grid xs={12} item>
                                                    <TextField
                                                        autoFocus
                                                        margin="dense"
                                                        select
                                                        id="msg-type"
                                                        label="Action Type"
                                                        fullWidth
                                                        variant="standard"
                                                        value={message.action}
                                                        onChange={e => setMessage({ ...message, action: e.target.value })}
                                                    >
                                                        {actions.map((action) => (
                                                            <MenuItem key={action} value={action}>
                                                                {action}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                </Grid>
                                                <Grid xs={12} item>
                                                    <TextField
                                                        id="value"
                                                        margin="dense"
                                                        label="Value"
                                                        fullWidth
                                                        variant="standard"
                                                        disabled={message.action === "ping" || message.action === "get" || message.action === "on/off"}
                                                        value={message.value}
                                                        onChange={e => setMessage({ ...message, value: e.target.value })}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={e => setDialogOpen(false)}>Cancel</Button>
                                            <Button onClick={e => handleMessageSent(connection.device_id)}>Send</Button>
                                        </DialogActions>
                                    </Dialog>
                                </div>
                            ))
                            }
                        </List>
                    </Box>
                </Grid>
                <Grid
                    item
                    md={8}
                    sm={8}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                    xs={12}
                >
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                        }}
                    >
                        <Box>
                            <Typography variant="h6">发送者</Typography>
                        </Box>
                        <Box>
                            <TextField
                                select
                                id="outlined-select-senders"
                                value={sender}
                                onChange={e => setSender(e.target.value)}
                                sx={{
                                    width: 400,
                                }}
                            >
                                {senders.map((sender) => (
                                    <MenuItem key={sender} value={sender}>
                                        {sender}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                    </Box>
                    <List
                        sx={{
                            width: '100%', maxWidth: 800, maxHeight: 300, bgcolor: 'background.paper',
                            overflow: 'auto', my: 3
                        }}
                        subheader={
                            <ListSubheader> <Typography variant="h6">消息</Typography></ListSubheader>
                        }
                    >
                        {messages
                            .filter(msg => sender === "all" ? true : msg.sender === sender)
                            .sort((x, y) => new Date(x.created_at) - new Date(y.created_at))
                            .map((message) => (
                                <div key={message.id}>
                                    <ListItemButton
                                        key={message.id}
                                    >
                                        {/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
                                            .test(message.sender) ? <Avatar sx={{
                                                m: 1, bgcolor: 'primary.main', height: 32,
                                                width: 32
                                            }}><DevicesIcon /></Avatar> : <Avatar sx={{
                                                m: 1, bgcolor: 'primary.main', height: 32,
                                                width: 32
                                            }}>
                                        </Avatar>}
                                        <ListItemText
                                            sx={{ width: '100%' }}
                                            primary={message.data}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        sx={{ display: 'inline' }}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        {message.protocol}
                                                    </Typography>
                                                    {` —  ${message.sender}`}
                                                </React.Fragment>
                                            }
                                        />
                                        {message.created_at}
                                    </ListItemButton>
                                    <Divider />
                                </div>
                            ))}
                    </List>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            p: 2
                        }}
                    >
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={e => setShouldUpdate(true)}
                        >
                            刷新
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}