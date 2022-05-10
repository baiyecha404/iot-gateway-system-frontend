import React, { useState, useEffect } from "react"
import { Typography, Avatar, Box, TextField, Alert } from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton";
import AuthService from "../../api/Auth"
import { useNavigate } from "react-router-dom";

export default function Verify() {

    const [code, setCode] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    // eslint-disable-next-line no-unused-vars
    const [targetDate, _] = useState(
        new Date(new Date().getTime() + 60 * 1000)
    );
    const navigate = useNavigate();

    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    const validateCode = (code) => {
        return code.length < 5 && !isNaN(code);
    }

    const renderCountDown = () => {
        if (targetMinutes > -1) {
            return <Alert severity="info">验证码将在{targetMinutes}s 后过期</Alert>
        } else {
            return <Alert severity="warning">验证码已过期</Alert>
        }
    }

    const renderMessage = () => {
        if (error) {
            return (
                <React.Fragment>
                    <Box>
                        {renderCountDown()}
                        <Alert severity="error">{error}</Alert>
                    </Box>
                </React.Fragment>
            )
        } else if (success) {
            return <Alert severity="success">{success}</Alert>
        } else {
            return renderCountDown();
        }
    }

    const handleVerify = (event) => {
        event.preventDefault();
        if (validateCode(code)) {
            setLoading(true)
            AuthService.adminVerify(code).then(resp => {
                setLoading(false);
                if (resp.err) {
                    setError(resp.err);
                    return;
                } else {
                    setError("");
                    setSuccess("Verification Successful")
                    sleep(400).then(() => {
                        navigate("/")
                    })
                }
            })
        }
    }

    const useCountDown = (targetDate) => {
        const countDownDate = new Date(targetDate).getTime();

        const [countDown, setCountDown] = useState(
            countDownDate - new Date().getTime()
        );

        useEffect(() => {
            const interval = setInterval(() => {
                setCountDown(countDownDate - new Date().getTime());
            }, 1000);

            return () => clearInterval(interval);
        }, [countDownDate]);

        return Math.floor((countDown % (1000 * 60)) / 1000);
    };

    const targetMinutes = useCountDown(targetDate);

    return (
        <React.Fragment>
            <Avatar sx={{ m: 3, bgcolor: 'success.main', mb: 2 }}></Avatar>
            <Typography component="h1" variant="h5">
                Verify
            </Typography>
            <Box component="form" sx={{ mt: 3, m: 3 }} method="post" action="?" onSubmit={handleVerify}>
                {renderMessage()}
                <TextField
                    margin="normal"
                    fullWidth
                    name="verify_code"
                    size="small"
                    placeholder="请输入短信验证码"
                    type="verify_code"
                    id="verify_code"
                    label="Verify code"
                    autoComplete="verify code"
                    onChange={(e) => setCode(e.target.value)}
                    error={!validateCode(code)}
                    helperText={validateCode(code) ? "" : "Verify Code must be 4 digits"} />
                <LoadingButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 3 }}
                    loading={loading}
                >
                    验证
                </LoadingButton>
            </Box>
        </React.Fragment>
    )
}