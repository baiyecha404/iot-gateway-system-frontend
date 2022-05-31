import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import ElderStatusCard from './ElderStatusCard';
import NotFound from '../../../assests/notfound.png';

export default function ElderStatus(props) {
    const { devices } = props;

    return (
        <React.Fragment>
            <Box sx={{ my: 1 }}>
                {devices.length ? devices.map((device) => (
                    <Box key={device.id} sx={{ my: 3 }}>
                        <ElderStatusCard deviceId={device.id} />
                    </Box>

                )) : <Card>
                    <CardContent>
                        <Grid
                            container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                        >

                            <Box >
                                <img src={NotFound} alt="Not Found" />
                            </Box>
                            <Box sx={{ my: 2 }}>
                                <Typography variant="h6" >没有绑定的设备</Typography>
                            </Box>
                        </Grid>
                    </CardContent>
                </Card>}
            </Box>
        </React.Fragment>
    )
}