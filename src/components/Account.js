import React, { useState, useEffect, useContext } from "react";
import { MessageContext } from "./DashBoard";
import {
    Box, Container, Typography, Grid, Card, CardContent, Avatar, Divider, Button, CardActionArea, CardHeader,
    TextField, Chip
} from "@mui/material";
import AuthService from "../api/Auth";
import UserService from "../api/User";
import AccountLog from './AccountLog';

export default function Account(props) {

    const { setSuccess, setError } = useContext(MessageContext)
    const { isAdmin } = props;
    const [username, setUserName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [logs, setLogs] = useState([]);
    const [info, setInfo] = useState({
        "username": "",
        "user_id": "",
        "role": "",
        "last_login": "",
        "is_admin": ""
    })


    useEffect(() => {
        UserService.getUserInfo(AuthService.getCurrentUser()).then(resp => {
            if (resp.result) {
                setInfo(resp.result)
                setUserName(resp.result.username)
                setPhoneNumber(resp.result.phone_number)
            }
        }).then(() => {
            if (isAdmin === false) {
                UserService.getUserLogs(AuthService.getCurrentUser()).then(resp => {
                    if (resp.result) {
                        setLogs(resp.result);
                    }
                })
            }
        })
    }, [])

    const validateUserName = (username) => {
        return username.length > 4 && username.length < 32
    }

    const validatePhoneNumber = (phoneNumber) => {
        return phoneNumber.length === 11 && !isNaN(phoneNumber)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        UserService.updateCurrentUserInfo(username, phoneNumber).then(resp => {
            if (resp.err) {
                setError(resp.err)
                console.log(resp.err);
                return;
            } else {
                setSuccess("Update Successful")
            }
        })

    }

    return (
        <React.Fragment>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        <Grid
                            item
                            lg={6}
                            md={8}
                            xs={12}
                        >
                            <Card >
                                <CardActionArea>
                                    <CardHeader
                                        title="用户"
                                        subheader=""
                                        sx={{
                                            height: 50,
                                            backgroundColor: (theme) => theme.palette.grey[200]
                                        }}
                                    />
                                    <CardContent>
                                        <Box
                                            sx={{
                                                alignItems: 'center',
                                                display: 'flex',
                                                flexDirection: 'column'
                                            }}
                                        >
                                            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                                            </Avatar>
                                            <Typography
                                                color="textPrimary"
                                                gutterBottom
                                                variant="h5"
                                            >
                                                {info.username}
                                            </Typography>
                                            <Chip label={`id: ${info.user_id}`} />
                                            <Typography
                                                color="textSecondary"
                                                variant="body2"
                                                sx={{ my: 1 }}
                                            >
                                                {`Last login: ${info.last_login}`}
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                    <Divider />
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid
                            component="form"
                            method="post"
                            item
                            lg={6}
                            md={6}
                            xs={12}
                            onSubmit={handleSubmit}
                        >
                            <Card>
                                <CardHeader
                                    title="用户信息"
                                    sx={{
                                        height: 50,
                                        backgroundColor: (theme) => theme.palette.grey[200]
                                    }}
                                />
                                <Divider />
                                <CardContent>
                                    <Grid
                                        container
                                        spacing={3}

                                    >
                                        <Grid
                                            item
                                            md={12}
                                            xs={12}
                                        >
                                            <TextField
                                                fullWidth
                                                label="Username"
                                                name="username"
                                                value={username}
                                                onChange={(e) => setUserName(e.target.value)}
                                                error={!validateUserName(username)}
                                                helperText={validateUserName(username) ? "" : "Username must be between 4 and 32 characters"}
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            md={12}
                                            xs={12}
                                        >
                                            <TextField
                                                fullWidth
                                                name="role"
                                                value={info.role}
                                                onChange={e => () => { }}
                                                variant="outlined"
                                                disabled
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            md={12}
                                            xs={12}
                                        >
                                            <TextField
                                                fullWidth
                                                label="Phone Number"
                                                name="phonenumber"
                                                value={phoneNumber}
                                                variant="outlined"
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                                error={!validatePhoneNumber(phoneNumber)}
                                                helperText={validatePhoneNumber(phoneNumber) ? "" : "Phone number must be 11 digits"}
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                                <Divider />
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        p: 2
                                    }}
                                >
                                    <Button
                                        type="submit"
                                        color="primary"
                                        variant="contained"
                                    >
                                        更新
                                    </Button>
                                </Box>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
                {isAdmin===false && <AccountLog logs={logs}/>}
            </Box>
        </React.Fragment>
    )
}