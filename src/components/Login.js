import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    CssBaseline, Container, Typography, Box, Avatar, Card, TextField, Alert, Link, Grid
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoadingButton from "@mui/lab/LoadingButton";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AuthService from "../api/Auth";

const theme = createTheme({
    palette: {
        background: {
            default: '#F9FAFC',
            paper: '#FFFFFF'
        },
        divider: '#E6E8F0',
        primary: {
            main: '#5048E5',
            light: '#828DF8',
            dark: '#3832A0',
            contrastText: '#FFFFFF'
        },
        secondary: {
            main: '#10B981',
            light: '#3FC79A',
            dark: '#0B815A',
            contrastText: '#FFFFFF'
        }
    }
})

export default function Login() {

    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const navigate = useNavigate();


    const validateUserName = (username) => {
        return username.length > 4 && username.length < 32
    }

    const validatePassword = (password) => {
        return password.length > 4;
    }

    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    const handleLogin = (event) => {
        event.preventDefault();
        if (validateUserName(username) && validatePassword(password)) {
            setLoading(true);
            setError("")
            AuthService.login(username, password).then(resp => {
                setLoading(false)
                if (resp.result) {
                    setSuccess("Login Successful")
                    sleep(400).then(() => {
                        navigate("/")
                    })
                } else {
                    setError("Login Failed")
                }

                if (resp.err) {
                    setError(resp.err)
                }
            })
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Card sx={{
                        marginTop: 15,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Login
                        </Typography>
                        <Box component="form" sx={{ mt: 1, m: 1 }} method="post" action="?" onSubmit={handleLogin}>
                            {error && <Alert severity="error">{error}</Alert>}
                            {success && <Alert severity="success">{success}</Alert>}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                onChange={(e) => setUserName(e.target.value)}
                                error={!validateUserName(username)}
                                helperText={validateUserName(username) ? "" : "Username must be between 4 and 32 characters"} />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(e) => setPassword(e.target.value)}
                                error={!validatePassword(password)}
                                helperText={validatePassword(password) ? "" : "Password must contain at least 8 characters"} />
                            <LoadingButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 2, mb: 2 }}
                                loading={loading}>
                                ??????
                            </LoadingButton>
                            <Grid container>
                                <Grid item>
                                    <Link onClick={e => navigate("/admin/login")} variant="body2">
                                        {"Login as Admin"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Card>
                </Box>
            </Container>
        </ThemeProvider>
    );
}