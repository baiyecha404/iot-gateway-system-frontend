import React, { useState, useEffect } from 'react';
import { Grid, Card, CardHeader, CardContent, Typography, Box, Avatar } from '@mui/material';
import DevicesIcon from '@mui/icons-material/Devices';
import DeviceService from '../../../api/Device';
import ElderStatusCard from './ElderStatusCard';

export default function ElderStatus(props) {
    const { devices } = props;

    return (
        <React.Fragment>
            <Box sx={{ my: 1 }}>
                {devices.map((device) => (
                    <Box key={device.id}  sx={{ my: 3 }}>
                        <ElderStatusCard deviceId={device.id} />
                    </Box>

                ))}
            </Box>
        </React.Fragment>
    )
}