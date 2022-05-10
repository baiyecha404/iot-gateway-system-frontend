import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Divider, Card, CardContent, CardHeader, CardMedia, Typography, Container, CardActionArea } from "@mui/material";
import DevicesIcon from '@mui/icons-material/Devices';
import MessageIcon from '@mui/icons-material/Message';
import Iot from "../../assests/iot.png";
import Message from "../../assests/message.png";

export default function Device() {

    const navigate = useNavigate();

    const handleNewDevice = (event) => {
        navigate('/devices/new', { reaplce: true })
    }


    const handleNewChannel = (event) => {
        navigate('/channels/new', { reaplce: true })
    }

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={16} md={8} lg={12}>
                    <Container maxWidth="md" component="main">
                        <Grid container spacing={10} alignItems="flex-end">
                            <Grid
                                item
                                xs={10}
                                sm={10}
                                md={4}
                            >
                                <Card sx={{ maxWidth: 380 }}>
                                    <CardActionArea onClick={handleNewDevice}>
                                        <CardHeader
                                            avatar={<DevicesIcon />}
                                            title="添加设备"
                                            sx={{
                                                height: 40,
                                                backgroundColor: (theme) => theme.palette.grey[200]
                                            }}
                                        />
                                        <Divider />
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={Iot}
                                            alt="Iot Icon"
                                        />
                                        <CardContent>
                                            <Typography variant="body2" color="text">
                                                Add and connect IOT device
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                            <Grid
                                item
                                xs={10}
                                sm={10}
                                md={4}
                            >
                                <Card sx={{ maxWidth: 380 }}>
                                    <CardActionArea onClick={handleNewChannel}>
                                        <CardHeader
                                            avatar={<MessageIcon />}
                                            title="创立信道"
                                            sx={{
                                                height: 40,
                                                backgroundColor: (theme) => theme.palette.grey[200]
                                            }}
                                        />
                                        <Divider />
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={Message}
                                            alt="Message Icon"
                                        />
                                        <CardContent>
                                            <Typography variant="body2" color="text">
                                                Create a channel for device
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        </Grid>
                    </Container>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}