import React, { useState } from "react";
import {
    Typography, Grid, List, ListSubheader, ListItemButton, ListItemText, ListItemIcon, TextField, MenuItem,
    Box, Button
} from "@mui/material";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ReactHlsPlayer from "react-hls-player";
import DownloadIcon from '@mui/icons-material/Download';
import Utils from "../../../utils/Utils";

export default function BedRoomMonitor() {
    const hlsUrl = "http://d3rlna7iyyu8wu.cloudfront.net/skip_armstrong/skip_armstrong_stereo_subs.m3u8";
    const downloadUrl = "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4";

    const logs = [
        { "id": "1", "action": "上床", "level": "normal", "time": "2020-05-05 12:12:12" },
        { "id": "2", "action": "下床", "level": "normal", "time": "2020-05-05 12:43:06" }

    ];

    const videos = [
        "bed_room_monitor_a1ec3f2e-91a1-471f-aeb3-186687a7f02f_2022_04_01.mp4",
        "bed_room_monitor_a1ec3f2e-91a1-471f-aeb3-186687a7f02f_2022_04_02.mp4",
        "bed_room_monitor_a1ec3f2e-91a1-471f-aeb3-186687a7f02f_2022_04_03.mp4",
    ];
    const [video, setVideo] = useState(videos[0]);


    const handleExportLog = (event) => {
        event.preventDefault();
        Utils.downloadFile({
            data: JSON.stringify(logs),
            fileName: 'bedroom-logs.export.json',
            fileType: 'text/json',
        })
    }

    const handleVideoDownload = (event) => {
        event.preventDefault();
        Utils.downloadFileByUrl({
            url: downloadUrl, 
            fileName: video
        });
    }


    return (
        <React.Fragment>
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                }}
            >
                <Grid item md={7} sm={7}>
                    <TextField
                        select
                        id="outlined-select-video"
                        value={video}
                        onChange={e => setVideo(e.target.value)}
                        fullWidth
                    >
                        {videos.map((video) => (
                            <MenuItem key={video} value={video}>
                                {video}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Box sx={{ m: 1 }}>
                    <Button
                        sx={{ mr: 1 }}
                        onClick={handleExportLog}
                    >
                        Export Logs
                    </Button>
                    <Button
                        startIcon={(<DownloadIcon fontSize="small" />)}
                        sx={{ mr: 1 }}
                        variant="contained"
                        onClick={handleVideoDownload}
                    >
                       View Video
                    </Button>
                </Box>
            </Box>
            <Grid container spacing={3} wrap="wrap" sx={{ my: 3 }}>
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
                    <ReactHlsPlayer
                        src={hlsUrl}
                        autoPlay={true}
                        controls={true}
                        width="100%"
                        height="auto"
                    />
                </Grid>
                <Grid
                    item
                    md={5}
                    sm={5}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                    xs={12}
                >
                    <List
                        sx={{
                            width: '100%', backgroundColor: (theme) => theme.palette.grey[100],
                            overflow: 'auto', maxHeight: 330,
                        }}
                        subheader={<ListSubheader>日志</ListSubheader>}
                    >
                        {logs.map((log) => (
                            <ListItemButton key={log.id}>
                                <ListItemIcon>
                                    <EventAvailableIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary={log.action}
                                    secondary={
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {log.time}
                                        </Typography>
                                    }
                                >
                                </ListItemText>
                            </ListItemButton>
                        ))}
                    </List>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}