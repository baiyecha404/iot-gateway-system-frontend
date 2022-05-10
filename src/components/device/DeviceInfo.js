import React, { useState, useEffect, useContext } from "react";
import { MessageContext } from "../DashBoard";
import {
    Divider, Grid, Typography, List,
    ListItemButton, ListItemText, Tooltip, TextField, Button
} from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeviceService from '../../api/Device';

export default function DeviceInfo(props) {
    const { setSuccess, setError } = useContext(MessageContext)
    const { deviceId } = props;

    const [toolTipOpen, setToolTipOpen] = useState(false);
    const [shouldUpdate, setShouldUpdate] = useState(true);
    const [device, setDevice] = useState({
        connect_uri: "",
        created_at: "",
        id: "",
        label: "",
        name: "",
        protocol: "",
        status: "",
        owner_id: "",
        api_key: ""
    });


    useEffect(() => {
        if (shouldUpdate) {
            DeviceService.getDeviceInfo(deviceId).then(resp => {
                if (resp.result) {
                    setDevice(resp.result);
                }
            }).then(() => {
                setShouldUpdate(false);
            })
        }
        return () => setShouldUpdate(false);
    }, [deviceId, shouldUpdate])


    const copyKey = (event) => {
        event.preventDefault();
        navigator.clipboard.writeText(device.api_key);
        setToolTipOpen(true);
    }


    const handleDeviceUpdate = (event) => {
        event.preventDefault();
        DeviceService.updateDevice(deviceId, {
            label: device.label,
            name: device.name,
            connect_uri: device.connect_uri
        }).then(resp => {
            if (resp.result) {
                setError("");
                setSuccess(resp.result);
            }

            if (resp.err) {
                setSuccess("");
                setError(resp.err);
            }
        }).then(() => {
            setShouldUpdate(true);
        })
    }


    return (
        <React.Fragment>
            <Grid
                container
                spacing={6}
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
                    <List >
                        <ListItemButton sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={<Typography variant="body2" fontWeight="bold">Name</Typography>} />
                            <TextField
                                id="device-name"
                                label="Device Name"
                                value={device.name}
                                onChange={e => setDevice({ ...device, name: e.target.value })}
                            />
                        </ListItemButton>
                        <ListItemButton sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={<Typography variant="body2" fontWeight="bold">Label</Typography>} />
                            <TextField
                                id="device-label"
                                label="Device Label"
                                value={device.label}
                                onChange={e => setDevice({ ...device, label: e.target.value })}
                            />
                        </ListItemButton>
                        <ListItemButton sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={<Typography variant="body2" fontWeight="bold">Connect Uri</Typography>} />
                            <TextField
                                id="device-connect-uri"
                                label="Connect Uri"
                                value={device.connect_uri}
                                onChange={e => setDevice({ ...device, connect_uri: e.target.value })}
                            />
                        </ListItemButton>
                    </List>
                    <Divider />
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={handleDeviceUpdate}
                        disabled={device.status === "running"}
                    >
                        更新
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
                    <List>
                        <ListItemButton sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={<Typography variant="body2" fontWeight="bold">Protocol</Typography>} />
                            <Typography variant="body1">{device.protocol}</Typography>
                        </ListItemButton>
                        <Tooltip
                            open={toolTipOpen}
                            title="已复制至剪切板!"
                            leaveDelay={500}
                            onClose={() => setToolTipOpen(false)}
                        >
                            <ListItemButton sx={{ py: 1, px: 0 }} onClick={copyKey}>
                                <ListItemText primary={<Typography variant="body2" fontWeight="bold">API key</Typography>} />
                                <Typography variant="body1">{device.api_key}</Typography>
                                <ContentCopyIcon />
                            </ListItemButton>
                        </Tooltip>
                        <ListItemButton sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={<Typography variant="body2" fontWeight="bold">Created User Id</Typography>} />
                            <Typography variant="body1">{device.owner_id}</Typography>
                        </ListItemButton>
                        <ListItemButton sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={<Typography variant="body2" fontWeight="bold" >Location</Typography>} />
                            <Typography variant="body1">{device.location}</Typography>
                        </ListItemButton>
                        <ListItemButton sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={<Typography variant="body2" fontWeight="bold" >Created time</Typography>} />
                            <Typography variant="body1">{device.created_at}</Typography>
                        </ListItemButton>
                    </List>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}