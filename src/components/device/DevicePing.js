import React, { useState, useEffect } from 'react';
import { green, red } from '@mui/material/colors';
import { Typography, CircularProgress, TextField, Fab, Box } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import DeviceService from '../../api/Device';

export default function DevicePing(props) {

    const { info, setButtonDisabled } = props;

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const successButtonSx = {
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };


    const errorButtonSx = {
        ...(error && {
            bgcolor: red[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };



    const handleButtonClick = () => {
        if (!loading) {
            setSuccess(false);
            setError(false);
            setLoading(true);
            DeviceService.ping(info.host, info.port).then(result => {
                if (result) {
                    setSuccess(true);
                    setLoading(false);
                    setButtonDisabled(false);
                } else {
                    setError(true);
                    setLoading(false);
                }
            })
        }
    };


    function renderButton() {
        if (success) {
            return (
                <Fab
                    color="primary"
                    sx={successButtonSx}
                    onClick={handleButtonClick}
                    size="small"
                >
                    <CheckIcon />
                </Fab>
            )
        } else if (error) {
            return (
                <Fab
                    color="primary"
                    sx={errorButtonSx}
                    onClick={handleButtonClick}
                    size="small"
                >
                    <ErrorIcon />
                </Fab>
            )
        }
        return (<Fab
            color="primary"
            onClick={handleButtonClick}
            size="small">
            Ping</Fab>);
    }


    useEffect(() => {
        setButtonDisabled(true);
    }, [setButtonDisabled])

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                设备测试
            </Typography>
            <Typography variant="h7" gutterBottom>
                请点击按钮，检查设备是否可连接
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ m: 3, position: 'relative' }}>
                    {renderButton()}
                    {loading && (
                        <CircularProgress
                            size={51}
                            sx={{
                                color: green[500],
                                position: 'absolute',
                                top: -6,
                                left: -6,
                                zIndex: 1,
                            }}
                        />
                    )}
                </Box>
                <Box sx={{ m: 1, position: 'relative' }}>
                    <TextField
                        id="connect_uri"
                        label="Ping this Address"
                        fullWidth
                        value={info.connect_uri}
                        variant="outlined"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Box>
            </Box>
        </React.Fragment>
    )
}