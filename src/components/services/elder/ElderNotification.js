import React from "react";
import { Card, CardContent, Box, Typography, Switch, Divider } from "@mui/material";

export default function ElderNotification() {

    return (
        <React.Fragment>
            <Card>
                <CardContent>
                    <Box>
                        <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                                justifyContent: 'space-between',
                                flexWrap: 'wrap',
                            }}
                        >
                            <Typography
                                sx={{ m: 1 , mr:5 }}
                                variant="h6"
                            >
                                Phone notifications
                            </Typography>
                            <Typography
                                sx={{ m: 1 }}
                                variant="body1"
                            >
                                开启短信通知，以收到信息推送
                            </Typography>
                            <Box sx={{ m: 1 }}>
                                <Switch
                                    checked={true}
                                />
                            </Box>
                        </Box>
                    </Box>
                    <Divider />
                    <Box>
                    <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                                justifyContent: 'space-between',
                                flexWrap: 'wrap',
                            }}
                        >
                            <Typography
                                sx={{ m: 1, mr:9 }}
                                variant="h6"
                            >
                                Device Updates
                            </Typography>
                            <Typography
                                sx={{ m: 1 }}
                                variant="body1"
                            >
                                开启短信通知，以收到设备更新
                            </Typography>
                            <Box sx={{ m: 1 }}>
                                <Switch/>
                            </Box>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}