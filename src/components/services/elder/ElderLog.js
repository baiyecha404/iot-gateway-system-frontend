import React, { useState } from 'react';
import {
    Card, CardHeader, CardContent, Divider, Box, TextField, MenuItem, Button,
    Grid, List, ListItem, ListItemText, ListItemButton, Chip, Typography, ListItemAvatar, Avatar,
} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import WarningIcon from '@mui/icons-material/Warning';
import ElderLogChart from './ElderLogChart';
import Utils from '../../../utils/Utils';

export default function ElderLog() {

    const logs = [
        { "id": "1", "action": "出门", "level": "normal", "time": "12:12:12" },
        { "id": "2", "action": "进门", "level": "normal", "time": "07:43:06" },
        { "id": "3", "action": "出门", "level": "normal", "time": "12:43:06" },
        { "id": "4", "action": "摔倒", "level": "warning", "time": "18:43:06" },
        { "id": "5", "action": "出门", "level": "normal", "time": "12:43:06" },
        { "id": "6", "action": "进门", "level": "normal", "time": "11:43:06" },
    ];
    const dates = [...Array(7)].map((_, i) => {
        const d = new Date()
        d.setDate(d.getDate() - i)
        return d
    })
    const [currDate, setCurrDate] = useState(dates[0].toISOString().split('T')[0]);


    const handleExportLog = (event) => {
        event.preventDefault();
        Utils.downloadFile({
            data: JSON.stringify(logs),
            fileName: 'elder-logs.export.json',
            fileType: 'text/json',
        })
    }


    return (
        <React.Fragment>
            <Card>
                <CardHeader
                    title="消息日志"
                />
                <Divider />
                <CardContent>
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
                                value={currDate}
                                onChange={e => setCurrDate(e.target.value)}
                                fullWidth
                            >
                                {dates.map((date) => (
                                    <MenuItem key={date} value={date.toISOString().split('T')[0]}>
                                        {date.toISOString().split('T')[0]}
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
                                sx={{ mr: 1 }}
                                variant="contained"
                            >
                                Actions
                            </Button>
                        </Box>
                    </Box>
                    <Grid container spacing={3} wrap="wrap" sx={{ my: 3 }}>
                        <Grid item md={8} sm={8}>
                            <List sx={{ width: '100%', overflow: 'auto', maxHeight: 350 }}>
                                {logs.map((log) => (
                                    <div key={log.id}>
                                        <ListItem sx={{ py: 1, px: 0, width: 560 }}>
                                            <ListItemAvatar>
                                                <Avatar>
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={<Typography variant="body2" fontWeight="bold">{"张先生"}</Typography>}
                                                secondary={(log.time.split(":")[0]  > "12" ? "下午":  "上午") + log.time}
                                            />
                                            <ListItemText
                                                sx={{ mr: 10 }}
                                                primary={log.action}
                                            />
                                            <ListItemText
                                                primary={<Chip
                                                    icon={log.level === 'warning' ? <WarningIcon /> : <DoneIcon />}
                                                    label={log.level}
                                                    variant="outlined"
                                                    color={log.level === 'warning' ? 'error' : 'success'}
                                                />}
                                            />
                                        </ListItem>
                                        <Divider />
                                    </div>
                                ))}
                            </List>
                        </Grid>
                        <Grid item md={4} sm={4}>
                            <ElderLogChart logs={logs} />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}