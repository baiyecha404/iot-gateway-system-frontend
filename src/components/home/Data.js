import React from "react";
import { Card, CardContent, Grid, Typography, Avatar, Box } from "@mui/material";
import DevicesIcon from '@mui/icons-material/Devices';
import MessageIcon from '@mui/icons-material/Message';
import GroupIcon from '@mui/icons-material/Group';
import WarningIcon from '@mui/icons-material/Warning';

export default function Data() {
    return (
        <React.Fragment>
            <Grid
                item
                lg={3}
                sm={6}
                xl={3}
                xs={12}
            >
                <Card>
                    <CardContent>
                        <Grid
                            container
                            spacing={3}
                            sx={{ justifyContent: 'space-between' }}
                        >
                            <Grid item>
                                <Typography color="textSecondary"
                                    gutterBottom
                                    variant="overline">
                                    Devices Online
                                </Typography>
                                <Typography
                                    color="textPrimary"
                                    variant="h4"
                                >
                                    1 / 5
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Avatar
                                    sx={{
                                        backgroundColor: 'primary.main',
                                        height: 56,
                                        width: 56
                                    }}
                                >
                                    <DevicesIcon />
                                </Avatar>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid
                item
                xl={3}
                lg={3}
                sm={6}
                xs={12}
            >
                <Card>
                    <CardContent>
                        <Grid
                            container
                            spacing={3}
                            sx={{ justifyContent: 'space-between' }}
                        >
                            <Grid item>
                                <Typography color="textSecondary"
                                    gutterBottom
                                    variant="overline">
                                    Total Messages
                                </Typography>
                                <Typography
                                    color="textPrimary"
                                    variant="h4"
                                >
                                    131
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Avatar
                                    sx={{
                                        backgroundColor: 'secondary.main',
                                        height: 56,
                                        width: 56
                                    }}
                                >
                                    <MessageIcon />
                                </Avatar>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid
                item
                xl={3}
                lg={3}
                sm={6}
                xs={12}
            >
                <Card>
                    <CardContent>
                        <Grid
                            container
                            spacing={3}
                            sx={{ justifyContent: 'space-between' }}
                        >
                            <Grid item>
                                <Typography color="textSecondary"
                                    gutterBottom
                                    variant="overline">
                                    Total Users
                                </Typography>
                                <Typography
                                    color="textPrimary"
                                    variant="h4"
                                >
                                    15
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Avatar
                                    sx={{
                                        backgroundColor: 'warning.main',
                                        height: 56,
                                        width: 56
                                    }}
                                >
                                    <GroupIcon />
                                </Avatar>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid
                item
                xl={3}
                lg={3}
                sm={6}
                xs={12}
            >
                <Card>
                    <CardContent>
                        <Grid
                            container
                            spacing={3}
                            sx={{ justifyContent: 'space-between' }}
                        >
                            <Grid item>
                                <Typography color="textSecondary"
                                    gutterBottom
                                    variant="overline">
                                    Warnings
                                </Typography>
                                <Typography
                                    color="textPrimary"
                                    variant="h4"
                                >
                                    2
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Avatar
                                    sx={{
                                        backgroundColor: 'error.main',
                                        height: 56,
                                        width: 56
                                    }}
                                >
                                    <WarningIcon />
                                </Avatar>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

            </Grid>
        </React.Fragment>
    )
}