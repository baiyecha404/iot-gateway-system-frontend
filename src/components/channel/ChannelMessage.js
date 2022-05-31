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
import AlarmOffIcon from '@mui/icons-material/AlarmOff';
import MoreTimeOutlinedIcon from '@mui/icons-material/MoreTimeOutlined';
import ChannelService from '../../api/Channel';
import DeviceService from '../../api/Device';
import Utils from "../../utils/Utils";


const timeUnits = [
    { value: 1, label: "秒" },
    { value: 60, label: "分" },
    { value: 3600, label: "小时" },
    { value: 86400, label: "天" },
]

const actions = ["ping", "get", "set", "on/off", "control"];

export default function ChannelMessage(props) {
    const { channelId } = props;
    const { setSuccess, setError } = useContext(MessageContext)
    const [isSelected, setIsSelected] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);

    // add cron job
    const [startCronForm, setStartCronForm] = useState(false);
    const [cronAttribute, setCronAttribute] = useState("");
    const [cronDuration, setCronDuration] = useState(10);
    const [cronDurationUnit, setCronDurationUnit] = useState(1);

    // stop cron job
    const [stopCronForm, setStopCronForm] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [taskId, setTaskId] = useState("");

    const [deviceAttributes, setDeviceAttributes] = useState([]);
    const [senders, setSenders] = useState(["all"]);
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
        return () => setConnections([]);
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
        const allSenders = Object
            .keys(Utils.groupBy(messages, "sender"))
            .concat(["all"])
        setSenders(allSenders)
        return () => setSenders([]);
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

    const handleCronStartForm = (device_id) => {
        DeviceService.getDeviceAttributes(device_id).then(resp => {
            if (resp.result) {
                setDeviceAttributes(resp.result);
            }
        }).then(() => {
            setStartCronForm(true);
        })
    }

    const handleCronStopForm = (device_id) => {
        ChannelService.getCronJobs(channelId, device_id).then(resp => {
            if (resp.result) {
                setTasks(resp.result);
            }
        }).then(() => {
            setStopCronForm(true);
        })
    }

    const handleCronJobStart = (device_id) => {
        setStartCronForm(false);
        ChannelService
            .startCronJob(channelId, device_id, cronAttribute,
                parseInt(cronDuration) * cronDurationUnit).then(resp => {
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


    const handleCronJobStop = (device_id) => {
        setStopCronForm(false);
        ChannelService.stopCronJob(channelId, device_id, taskId).then(resp => {
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
                    md={5}
                    sm={5}
                    xs={12}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                    item>
                    <Box>
                        {connections.length === 0 ?
                            <Grid
                                container
                                spacing={0}
                                sx={{ my: 5 }}
                                direction="column"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Typography variant="h6">没有连接</Typography>
                            </Grid>
                            :
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
                                {connections.map((connection) => (
                                    <div key={connection.device_id}>
                                        <ListItemButton
                                            onClick={e => handleConnectionClick(connection.device_id)}
                                            selected={isSelected === connection.device_id}
                                        >
                                            <ListItemText
                                                primary={connection.device}
                                                secondary={connection.device_id}
                                                onClick={e => navigate(`/devices/${connection.device_id}/connection`, { replace: true })}
                                            />
                                            <Box sx={{
                                                display: 'flex',
                                                justifyContent: 'flex-end',
                                            }}>
                                                <IconButton aria-label="messages" edge="end"
                                                    onClick={e => handleMessageForm(connection.device_id)}>
                                                    <CommentIcon sx={{ width: 24, height: 24 }} />
                                                </IconButton>
                                                <IconButton aria-label="start-cronjob" edge="end"
                                                    onClick={e => handleCronStartForm(connection.device_id)}>
                                                    <MoreTimeOutlinedIcon sx={{ width: 24, height: 24 }} />
                                                </IconButton>
                                                <IconButton aria-label="stop-cronjob" edge="end"
                                                    onClick={e => handleCronStopForm(connection.device_id)}
                                                >
                                                    <AlarmOffIcon sx={{ width: 24, height: 24 }} />
                                                </IconButton>
                                            </Box>
                                        </ListItemButton>
                                        <Dialog open={startCronForm} onClose={e => setStartCronForm(false)}
                                            fullWidth
                                            maxWidth={'sm'}>
                                            <DialogTitle>Start CronJobs</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText>
                                                    请选择属性与定时任务时间
                                                </DialogContentText>
                                                <Grid container wrap="wrap" spacing={3}>
                                                    <Grid xs={12} item>
                                                        <TextField
                                                            id="attribute"
                                                            margin="dense"
                                                            label="Attribute"
                                                            fullWidth
                                                            select
                                                            variant="standard"
                                                            value={cronAttribute}
                                                            onChange={e => setCronAttribute(e.target.value)}
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
                                                            id="duration"
                                                            margin="dense"
                                                            label="Duration"
                                                            fullWidth
                                                            variant="standard"
                                                            value={cronDuration}
                                                            onChange={e => setCronDuration(e.target.value)}
                                                        />
                                                    </Grid>
                                                    <Grid xs={12} item>
                                                        <TextField
                                                            id="duration-unit"
                                                            margin="dense"
                                                            label="Unit"
                                                            select
                                                            fullWidth
                                                            variant="standard"
                                                            value={cronDurationUnit}
                                                            onChange={e => setCronDurationUnit(e.target.value)}
                                                        >
                                                            {timeUnits.map((unit) => (
                                                                <MenuItem key={unit.label} value={unit.value}>
                                                                    {unit.label}
                                                                </MenuItem>
                                                            ))}

                                                        </TextField>
                                                    </Grid>
                                                </Grid>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={e => setStartCronForm(false)}>Cancel</Button>
                                                <Button onClick={e => handleCronJobStart(connection.device_id)}>Start Cron Job</Button>
                                            </DialogActions>
                                        </Dialog>
                                        <Dialog open={stopCronForm} onClose={e => setStopCronForm(false)}
                                            fullWidth
                                            maxWidth={'sm'}>
                                            <DialogTitle>Stop CronJobs</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText>
                                                    正在进行的定时任务
                                                </DialogContentText>
                                                <Grid container wrap="wrap" spacing={3}>
                                                    <Grid xs={12} item>
                                                        <TextField
                                                            id="tasks"
                                                            margin="dense"
                                                            label="Tasks"
                                                            fullWidth
                                                            select
                                                            variant="standard"
                                                            value={taskId}
                                                            onChange={e => setTaskId(e.target.value)}
                                                        >
                                                            {tasks.map((task) => (
                                                                <MenuItem key={task} value={task}>
                                                                    {task}
                                                                </MenuItem>
                                                            ))}
                                                        </TextField>
                                                    </Grid>
                                                </Grid>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={e => setStopCronForm(false)}>Cancel</Button>
                                                <Button onClick={e => handleCronJobStop(connection.device_id)}>Stop Cron Job</Button>
                                            </DialogActions>
                                        </Dialog>
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
                                                            id="attribute"
                                                            margin="dense"
                                                            label="Attribute"
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
                                ))}
                            </List>
                        }
                    </Box>
                </Grid>
                <Grid
                    item
                    md={7}
                    sm={7}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                    xs={12}
                >
                    <List
                        sx={{
                            width: '100%', maxWidth: 800, maxHeight: 360, bgcolor: 'background.paper',
                            overflow: 'auto'
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
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'flex-end',
                            flexWrap: 'wrap',
                            my: 3
                        }}
                    >
                        <Box sx={{ mr: 5 }}>
                            <TextField
                                select
                                label="发送者"
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