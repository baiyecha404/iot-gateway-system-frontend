import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import notfound from '../assests/notfound.svg';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <Box
            component="main"
            sx={{
                marginTop: 10,
                alignItems: 'center',
                display: 'flex',
                flexGrow: 1,
                minHeight: '100%'
            }}
        >
            <Container maxWidth="md">
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Typography
                        align="center"
                        color="textPrimary"
                        variant="h4"
                        sx={{ fontWeight: 'bold' }}
                    >
                        404: Page Not Found
                    </Typography>
                    <Box sx={{ textAlign: 'center' }}>
                        <img
                            alt="Under development"
                            src={notfound}
                            style={{
                                marginTop: 50,
                                display: 'inline-block',
                                maxWidth: '100%',
                                width: 560
                            }}
                        />
                    </Box>
                    <Button
                        component="a"
                        startIcon={(<ArrowBackIcon fontSize="big" />)}
                        sx={{ mt: 3 }}
                        variant="contained"
                        onClick={e => navigate("/")}
                    >
                        Go back
                    </Button>
                </Box>
            </Container >
        </Box >
    );
}
