import React, { useState, useEffect } from "react";
import {
    Card, CardHeader, CardContent, Typography, Divider, List, ListItemButton, ListItemText,
    Box, Grid, Skeleton, Button, Link, Dialog, DialogContent, DialogActions, DialogTitle, DialogContentText,
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import { Map, Marker } from 'react-amap';

export default function ElderLocation(props) {
    const { id } = props;
    const mapCenter = { longitude: 118.9317, latitude: 32.1057 };
    const YOUR_AMAP_KEY = "2b792e5debb8d32975dadef246e43a84";
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        window._AMapSecurityConfig = {
            securityJsCode: '9eb0cbec4c3ccdd4fc5d7eafb4e37132',
        }
        return () => { window._AMapSecurityConfig = null }
    })

    return (
        <React.Fragment>
            <Card>
                <CardHeader
                    title="老人位置"
                />
                <Divider />
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Box
                                sx={{
                                    height: 400,
                                    width: 400,
                                }}
                            >
                                <Map
                                    amapkey={YOUR_AMAP_KEY}
                                    zoom={22}
                                    center={mapCenter}
                                    loading={
                                        <Skeleton
                                            animation="wave"
                                            variant="rectangular"
                                            sx={{ bgcolor: 'grey.200' }}
                                            width={400}
                                            height={400}
                                        />
                                    }
                                    events={{
                                        created: (map) => {
                                            console.log('map created');
                                        }
                                    }}
                                >
                                    <Marker
                                        position={mapCenter}
                                        events={{
                                            click: (_) => {
                                                alert('clicked');
                                            }
                                        }}
                                    />
                                </Map>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography
                                sx={{ display: 'inline' }}
                                variant="body1"
                                color="text.primary"
                            >
                                位置信息
                            </Typography>
                            <List>
                                <ListItemButton sx={{ width: 320 }}>
                                    <ListItemText primary={<Typography variant="body2" fontWeight="bold">经度</Typography>} />
                                    <Typography variant="body2">{mapCenter.longitude}</Typography>
                                </ListItemButton>
                                <Divider />
                                <ListItemButton sx={{ width: 320 }}>
                                    <ListItemText primary={<Typography variant="body2" fontWeight="bold">纬度</Typography>} />
                                    <Typography variant="body2">{mapCenter.latitude}</Typography>
                                </ListItemButton>
                                <Divider />
                                <ListItemButton sx={{ width: 320 }}>
                                    <ListItemText primary={<Typography variant="body2" fontWeight="bold">地点</Typography>} />
                                    <Typography variant="body2">{"南京市栖霞区南京邮电大学南门"}</Typography>
                                </ListItemButton>
                                <Divider />
                                <ListItemButton sx={{ width: 320 }}>
                                    <ListItemText primary={<Typography variant="body2" fontWeight="bold">设备</Typography>} />
                                    <Typography variant="body2">
                                        <Link underline="always">
                                            {"智能手表"}
                                        </Link>
                                    </Typography>
                                </ListItemButton>
                                <Divider />
                                <ListItemButton sx={{ width: 320 }}>
                                    <ListItemText primary={<Typography variant="body2" fontWeight="bold">设备属性</Typography>} />
                                    <Typography variant="body2">{"geolocation"}</Typography>
                                </ListItemButton>
                                <Divider />
                                <ListItemButton sx={{ width: 320 }}>
                                    <ListItemText primary={<Typography variant="body2" fontWeight="bold">最近更新</Typography>} />
                                    <Typography variant="body2">{"2022-04-14 00:00:00"}</Typography>
                                </ListItemButton>
                                <Divider />
                            </List>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    p: 2
                                }}
                            >
                                <Button
                                    startIcon={<PhoneIcon />}
                                    type="submit"
                                    color="primary"
                                    variant="contained"
                                    onClick={() => setDialogOpen(true)}
                                >
                                    联系
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
                <Dialog open={dialogOpen} onClose={e => setDialogOpen(false)}
                    fullWidth
                    maxWidth={'sm'}>
                    <DialogTitle>Dial Call</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            确认向老人发送信息？
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={e => setDialogOpen(false)}>Cancel</Button>
                        <Button onClick={e => setDialogOpen(false)}>Send</Button>
                    </DialogActions>
                </Dialog>
            </Card>
        </React.Fragment >
    );
}