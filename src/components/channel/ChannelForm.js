import React from "react";
import { Typography, Grid, TextField } from "@mui/material";

export default function DeviceForm(props) {

    const { name, setChannelName } = props;

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom sx={{ mb: 1, m: 2 }}>
                配置
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="channel-name"
                        name="channel-name"
                        label="Channel Name"
                        fullWidth
                        placeholder="The Name for Channel"
                        value={name}
                        onChange={e => setChannelName(e.target.value)}
                        variant="outlined"
                        error={name === ""}
                        helperText={name === "" ? "Channel Name is required": ""}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}