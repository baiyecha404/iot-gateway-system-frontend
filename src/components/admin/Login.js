import React, { useState } from 'react';
import {
    CssBaseline, Container, Typography, Box, Avatar, Card,
    TextField, FormControlLabel, Checkbox, Alert,
} from '@mui/material';
import LoadingButton from "@mui/lab/LoadingButton";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AuthService from "../../api/Auth";
import Verify from './Verify';

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
    const [shouldVerify, setShouldVerify] = useState(false)

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
            AuthService.adminLogin(username, password).then(resp => {
                setLoading(false)
                if (resp.token) {
                    setSuccess("Login Successful")
                    sleep(400).then(() => {
                        setShouldVerify(true)
                    })
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
                        <React.Fragment>
                            {shouldVerify ? <Verify /> : <React.Fragment>
                                <Avatar sx={{ m: 1, bgcolor: 'success.main' }}>
                                </Avatar><Typography component="h1" variant="h5">
                                    Admin Login
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
                                    <FormControlLabel
                                        control={<Checkbox value="remember" color="primary" />}
                                        label="Remember me" />
                                    <LoadingButton
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 2, mb: 2 }}
                                        loading={loading}>
                                        登录
                                    </LoadingButton>
                                </Box>
                            </React.Fragment>
                            }
                        </React.Fragment>
                    </Card>
                </Box>
            </Container>
        </ThemeProvider>
    );
}