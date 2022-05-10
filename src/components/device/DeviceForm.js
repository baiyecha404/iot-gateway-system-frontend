import React from "react";
import { Typography, Grid, TextField, MenuItem } from "@mui/material";

export default function DeviceForm(props) {

    const { info, setInfo } = props;

    const connectors = [{
        "value": "http connector",
        "protocol": "HTTP / HTTPs",
    },
    {
        "value": "mqtt connector",
        "protocol": "MQTT",
    },
    {
        "value": "ftp connector",
        "protocol": "FTP",
    }]


    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom sx={{ mb: 1, m: 2 }}>
                设备配置
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="host"
                        name="host"
                        label="Host"
                        fullWidth
                        placeholder="127.0.0.1"
                        variant="outlined"
                        value={info.host}
                        onChange={e => { setInfo({ ...info, host: e.target.value }) }}
                        error={info.host === ""}
                        helperText={info.host === "" ? "device host is required": ""}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="port"
                        name="port"
                        label="Port"
                        fullWidth
                        placeholder="80"
                        variant="outlined"
                        value={info.port}
                        onChange={e => { setInfo({ ...info, port: e.target.value }) }}
                        error={info.port === ""}
                        helperText={info.port === "" ? "device port is required": ""}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="username"
                        name="username"
                        label="Device Username"
                        fullWidth
                        placeholder="Device auth username"
                        variant="outlined"
                        value={info.username}
                        onChange={e => { setInfo({ ...info, username: e.target.value }) }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="password"
                        name="password"
                        label="Device Password"
                        fullWidth
                        placeholder="Device auth password"
                        variant="outlined"
                        value={info.password}
                        onChange={e => { setInfo({ ...info, password: e.target.value }) }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="name"
                        name="name"
                        label="Device Name"
                        fullWidth
                        placeholder="The Name for Device"
                        variant="outlined"
                        value={info.deviceName}
                        onChange={e => { setInfo({ ...info, deviceName: e.target.value }) }}
                        error={info.deviceName === ""}
                        helperText={info.deviceName === "" ? "device name is required": ""}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="label"
                        name="label"
                        label="Label"
                        fullWidth
                        placeholder="The Label for Device"
                        variant="outlined"
                        value={info.label}
                        onChange={e => { setInfo({ ...info, label: e.target.value }) }}
                        error={info.label === ""}
                        helperText={info.label === "" ? "device label is required": ""}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="location"
                        name="location"
                        label="Location"
                        fullWidth
                        placeholder="The Location for Device"
                        variant="outlined"
                        value={info.location}
                        onChange={e => { setInfo({ ...info, location: e.target.value }) }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="outlined-select-protocol"
                        select
                        fullWidth
                        value={info.connector}
                        onChange={e => { setInfo({ ...info, connector: e.target.value }) }}
                        label="Select your connector protocol"
                        helperText="Please select connector to connect to device"
                    >
                        {connectors.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.protocol}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}