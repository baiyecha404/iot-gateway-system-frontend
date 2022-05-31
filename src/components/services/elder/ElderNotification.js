import React, { useState, useContext } from "react";
import { MessageContext } from "../../DashBoard";
import { Card, CardContent, Box, Typography, Switch, Divider } from "@mui/material";

export default function ElderNotification() {
    const { setSuccess } = useContext(MessageContext);
    const [checked, setChecked] = useState(true);

    const handleNotification = (event) => {
        setChecked(!checked);
        if (checked) {
            setSuccess("Successfully enable message notification");
        } else {
            setSuccess("Successfully disable message notification");
        }
    }


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
                                my: 3
                            }}
                        >
                            <Typography
                                sx={{ m: 1, mr: 5 }}
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
                                    onChange={handleNotification}
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
                                my: 3
                            }}
                        >
                            <Typography
                                sx={{ m: 1, mr: 9 }}
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
                                <Switch
                                    onChange={() => { setSuccess("Update Successful") }}
                                />
                            </Box>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}