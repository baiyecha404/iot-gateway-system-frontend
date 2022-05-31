import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Paper, Typography, Stepper, Step, StepLabel, Box, Button, Link } from "@mui/material";
import DeviceForm from "./DeviceForm";
import DeviceSummary from "./DeviceSummary";
import DevicePing from "./DevicePing";
import DeviceService from "../../api/Device";


export default function AddNewDevice() {

    const steps = ['Device settings', 'Connect details', 'Ping device'];
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [deviceInfo, setDeviceInfo] = useState({
        host: "",
        port: "",
        username: "",
        password: "",
        deviceName: "",
        label: "",
        location: "",
        connector: "http connector",
        connect_uri: "",
    })
    const [deviceId, setDeviceId] = useState(null);
    const [activeStep, setActiveStep] = useState(0);
    const navigate = useNavigate();


    const handleNext = () => {
        if (activeStep === 2) {
            // finish device settings
            DeviceService.createOne(deviceInfo).then(id => {
                setDeviceId(id);
                setActiveStep(activeStep + 1);
            })
        } else {
            setActiveStep(activeStep + 1);
        }
    }

    const handlePrev = () => {
        setActiveStep(activeStep - 1);
    }


    const getStepContents = (steps) => {
        switch (steps) {
            case 0:
                return <DeviceForm info={deviceInfo} setInfo={setDeviceInfo} />;
            case 1:
                return <DeviceSummary info={deviceInfo} setInfo={setDeviceInfo} />;
            case 2:
                return <DevicePing
                    info={deviceInfo}
                    setInfo={setDeviceInfo}
                    setButtonDisabled={setButtonDisabled} />;
            default: throw new Error("Unknown step");
        }
    }


    return (
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 1 }, p: { xs: 2, md: 3 } }}>
                <Typography component="h1" variant="h5" align="center">
                    Add New Device
                </Typography>
                <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <React.Fragment>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography variant="h5" gutterBottom>
                                Device is created.
                            </Typography>
                            <Typography variant="subtitle1">
                                Check out your device details at
                                <Link onClick={e => navigate(`/devices/${deviceId}/info`, { reaplce: true })} underline="always">
                                    /devices/{deviceId}
                                </Link>
                            </Typography>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {getStepContents(activeStep)}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                {activeStep !== 0 && (
                                    <Button onClick={handlePrev} sx={{ mt: 3, ml: 1 }}>
                                        上一步
                                    </Button>
                                )}

                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{ mt: 3, ml: 1 }}
                                    disabled={activeStep === 2 && buttonDisabled}
                                >
                                    {activeStep === steps.length - 1 ? '完成' : '下一步'}
                                </Button>
                            </Box>
                        </React.Fragment>)}
                </React.Fragment>
            </Paper>
        </Container>
    )
}