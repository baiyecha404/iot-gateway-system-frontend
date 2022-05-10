import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageContext } from '../DashBoard';
import {
    Grid, TextField, ListItemButton, MenuItem, Button, ListItemText, IconButton,
    List, Typography
} from '@mui/material';
import ChannelService from '../../api/Channel';
import DeviceService from '../../api/Device';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


export default function DeviceConnection(props) {
    const { setSuccess, setError } = useContext(MessageContext)
    const { deviceId } = props;

    const [selectedChannel, setSelectedChannel] = useState("");
    const [channels, setChannels] = useState([]);
    const [connections, setConnections] = useState([]);
    const [shouldUpdate, setShouldUpdate] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (shouldUpdate) {
            DeviceService.getDeviceConnections(deviceId).then(resp => {
                if (resp.result) {
                    setConnections(resp.result);
                }
                if (resp.err) {
                    setError(resp.err);
                }

            }).then(() => {
                setShouldUpdate(false);
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deviceId, shouldUpdate])


    useEffect(() => {
        ChannelService.getChannels().then(resp => {
            if (resp.result) {
                setChannels(resp.result);
            }
            if (resp.err) {
                setError(resp.err);
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const handleConnect = (channel_id) => {
        ChannelService.createConnection(channel_id, deviceId).then(resp => {
            if (resp.result) {
                setError("");
                setSuccess("Successfully connected to channel");
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


    const handleDisConnect = (channel_id, channel_name) => {
        ChannelService.deleteConnection(channel_id, deviceId).then(resp => {
            if (resp.result) {
                setError("");
                setSuccess("Successfully disconnected");
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
                spacing={4}
                wrap="wrap"
            >
                <Grid
                    item
                    md={6}
                    sm={6}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                    xs={12}
                >
                    <Typography variant='h6'>添加新连接</Typography>
                    <List>
                        <TextField
                            fullWidth
                            select
                            label="Channel"
                            value={selectedChannel}
                            defaultValue=""
                            onChange={e => setSelectedChannel(e.target.value)}
                        >
                            {channels.map((channel) => (
                                <MenuItem key={channel.id}
                                    value={channel.id}
                                    disabled={connections.find(connection => connection.channel_id === channel.id) !== undefined}
                                >
                                    {channel.name}({channel.id})
                                </MenuItem>
                            ))}
                        </TextField>
                    </List>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={(e) => handleConnect(selectedChannel)}
                        sx={{ my: 3 }}
                    >
                        连接
                    </Button>
                </Grid>
                <Grid
                    item
                    md={6}
                    sm={6}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                    xs={12}
                >
                    <Typography variant='h6'>已连接</Typography>
                    <List>
                        {connections.map((connection) => (
                            <ListItemButton
                                key={connection.channel_id}
                            >
                                <ListItemText
                                    primary={connection.channel.name}
                                    secondary={connection.channel_id}
                                />
                                <IconButton edge="end" onClick={e => navigate(`/channels/${connection.channel_id}/messages`, { replace: true })}>
                                    <ArrowForwardIcon />
                                </IconButton>
                                <IconButton edge="end" onClick={e => handleDisConnect(connection.channel_id, connection.channel.name)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemButton>
                        ))}
                    </List>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}