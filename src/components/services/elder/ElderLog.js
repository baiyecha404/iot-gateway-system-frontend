import React, { useState, useEffect } from 'react';
import {
    Card, CardHeader, CardContent, Divider, Box, TextField, MenuItem, Button,
    Grid, List, ListItem, ListItemText, ListItemButton, Chip, Typography, ListItemAvatar, Avatar,
} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import WarningIcon from '@mui/icons-material/Warning';
import ElderLogChart from './ElderLogChart';
import ElderService from '../../../api/Elder';
import Utils from '../../../utils/Utils';

export default function ElderLog(props) {
    const { elderId } = props;
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        ElderService.getElderLogs(elderId).then(resp => {
            if (resp.result) {
                setLogs(resp.result);
            }
        })
        return () => setLogs([]);
    }, [])


    const renderSeverityIcon = (severity) => {
        if (severity === 'normal') {
            return (<Chip
                icon={<DoneIcon />}
                label={severity}
                variant="outlined"
                color={"success"}
            />)
        } else if (severity === 'warning') {
            return (<Chip
                icon={<WarningIcon />}
                label={severity}
                variant="outlined"
                color={"warning"}
            />)
        } else if (severity === "danger") {
            return (<Chip
                icon={<WarningIcon />}
                label={severity}
                variant="outlined"
                color={"error"}
            />)
        }
    }

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
                    action={
                        <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                                justifyContent: 'flex-end',
                                flexWrap: 'wrap',
                            }}
                        >
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
                    }
                />
                <Divider />
                <CardContent>
                    <Grid container spacing={3} wrap="wrap" sx={{ my: 1 }}>
                        <Grid item md={8} sm={8}>
                            {logs.length === 0 ? 
                            <Grid
                                container
                                spacing={0}
                                sx={{ my: 5 }}
                                direction="column"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Typography variant="h6">暂无日志</Typography>
                            </Grid> : <List sx={{ width: '100%', overflow: 'auto', maxHeight: 350 }}>
                                {logs.map((log) => (
                                    <div key={log.id}>
                                        <ListItem sx={{ py: 1, px: 0, width: 560 }}>
                                            <ListItemText
                                                align="left"
                                                primary={<Typography variant="body2" fontWeight="bold">{log.username}</Typography>}
                                                secondary={log.time}
                                            />
                                            <ListItemText
                                                sx={{ mr: 5 }}
                                                primary={log.action}
                                            />
                                            <ListItemText
                                                align="right"
                                                primary={renderSeverityIcon(log.severity)}
                                            />
                                        </ListItem>
                                        <Divider />
                                    </div>
                                ))}
                            </List>}
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