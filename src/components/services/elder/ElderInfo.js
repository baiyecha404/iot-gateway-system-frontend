import React, { useState, useEffect } from 'react';
import {
    Card, CardHeader, CardContent, List, ListItem, ListItemText, Typography, Divider,
    Table, TableHead, TableRow, TableCell, TableBody, Chip, Link, Button
} from '@mui/material';
import ElderBindDevice from './ElderBindDevice';

export default function ElderInfo(props) {
    const { elderId, info, devices, setUpdate } = props;
    const [open, setOpen] = useState(false);

    return (
        <React.Fragment>
            <Card>
                <CardHeader
                    title="老人信息"
                />
                <Divider />
                <CardContent>
                    <List disablePadding>
                        <ListItem sx={{ py: 1, px: 0, width: 360 }}>
                            <ListItemText primary={<Typography variant="body2" fontWeight="bold">姓名</Typography>} />
                            <Typography variant="body2">{info.name}</Typography>
                        </ListItem>
                        <Divider />
                        <ListItem sx={{ py: 1, px: 0, width: 360 }}>
                            <ListItemText primary={<Typography variant="body2" fontWeight="bold">年龄</Typography>} />
                            <Typography variant="body2">{info.age}</Typography>
                        </ListItem>
                        <Divider />
                        <ListItem sx={{ py: 1, px: 0, width: 360 }}>
                            <ListItemText primary={<Typography variant="body2" fontWeight="bold">号码</Typography>} />
                            <Typography variant="body2">{info.phone_number}</Typography>
                        </ListItem>
                        <Divider />
                        <ListItem sx={{ py: 1, px: 0, width: 360 }}>
                            <ListItemText primary={<Typography variant="body2" fontWeight="bold">住址</Typography>} />
                            <Typography variant="body2">{info.address}</Typography>
                        </ListItem>
                    </List>
                </CardContent>
            </Card>
            <Card sx={{ my: 3 }}>
                <CardHeader
                    title="绑定设备"
                    action={
                        <Button
                        color="primary"
                        variant="contained"
                        sx={{ mr: 1 }}
                        onClick={e => setOpen(true)}
                    >
                        绑定设备
                    </Button>
                    }
                />
                <Divider />
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Label</TableCell>
                            <TableCell align='right'>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {devices.map(device => (
                            <TableRow key={device.id}>
                                <TableCell>
                                    <Link underline="always">
                                        {device.id}
                                    </Link>
                                </TableCell>
                                <TableCell scope="row">
                                    {device.name}
                                </TableCell>
                                <TableCell >
                                    <Chip label={device.label}></Chip>
                                </TableCell>
                                <TableCell align="right">
                                    <Chip color={device.status === "running" ? "success": "error"} label={
                                        <Typography variant='body2' fontWeight="bold">{device.status}</Typography>
                                    }>
                                    </Chip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
            {open && <ElderBindDevice
                elderId={elderId}
                devices={devices}
                open={open}
                setOpen={setOpen}
                setUpdate={setUpdate}
            />}
        </React.Fragment>
    )
}