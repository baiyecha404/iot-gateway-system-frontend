import React, { useState, useEffect} from 'react';
import {
    Card, CardHeader, CardContent, List, ListItem, ListItemText, Typography, Divider,
    Box, Table, TableHead, TableRow, TableCell, TableBody, Chip, Link
} from '@mui/material';
import ElderHealth from './ElderHealth';
import ElderService from '../../../api/Elder';

export default function ElderInfo(props) {
    const { elderId, info } = props;


    const devices = [
        { "id": "72936a15-c8b8-4f00-8537-c0a09bd10b51", "name": "智能手表", "label": "智能 定位", "status": "Active" },
        { "id": "72296a15-c8b8-4f00-9537-c0a09bd10b55", "name": "智能监控", "label": "监控", "status": "Active" },
    ];


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
                    title="健康状况"
                />
                <Divider />
                <CardContent>
                    <ElderHealth />
                </CardContent>
            </Card>
            <Card sx={{ my: 3 }}>
                <CardHeader
                    title="绑定设备"
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
                                    <Chip color='success' label={
                                        <Typography variant='body2' fontWeight="bold">{device.status}</Typography>
                                    }>
                                    </Chip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </React.Fragment>
    )
}