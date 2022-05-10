import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Paper, Typography, Stepper, Step, StepLabel, Box, Button, Link } from "@mui/material";
import ChannelForm from './ChannelForm';
import ChannelSummary from './ChannelSummary';
import ChannelService from '../../api/Channel';

export default function AddNewChannel() {

    const steps = ['Channel settings', 'Channel details'];
    const [activeStep, setActiveStep] = useState(0);
    const [channelName, setChannelName] = useState("");
    const [channelId, setChannelId] = useState(null);
    const navigate = useNavigate();

    const handleNext = () => {
        if (activeStep === 1) {
            ChannelService.createChannel(channelName).then(resp => {
                if (resp.result) {
                    setChannelId(resp.result);
                }
            })
        }
        setActiveStep(activeStep + 1);
    }

    const handlePrev = () => {
        setActiveStep(activeStep - 1);
    }


    const getStepContents = (steps) => {
        switch (steps) {
            case 0:
                return <ChannelForm name={channelName} setChannelName={setChannelName} />
            case 1:
                return <ChannelSummary name={channelName} />
            default: throw new Error("Unknown step");
        }
    }

    return (
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 1 }, p: { xs: 2, md: 3 } }}>
                <Typography component="h1" variant="h5" align="center">
                    Add New Channel
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
                                Channel is created.
                            </Typography>
                            <Typography variant="subtitle1">
                                Check out your channel details at
                                <Link onClick={e => navigate(`/channels/${channelId}/info`, { reaplce: true })} underline="always">
                                    /channels/{channelId}
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
                                >
                                    {activeStep === steps.length - 1 ? '创建' : '下一步'}
                                </Button>
                            </Box>
                        </React.Fragment>)}
                </React.Fragment>
            </Paper>
        </Container>
    )
}