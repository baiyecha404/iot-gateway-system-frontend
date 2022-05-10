import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Checkbox, Card, Box, Container, CardContent, Table, TableHead, TableCell, Link, Chip,
    TableRow, TableBody, TextField, InputAdornment, TablePagination, Divider,
    Button, Typography
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import ActionMenu from "./ActionMenu";
import DeviceService from "../../api/Device";
import Utils from '../../utils/Utils';

export default function DeviceList() {
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const [isLoading, setIsLoading] = useState([]);
    const [devices, setDevices] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const navigate = useNavigate();


    useEffect(() => {
        DeviceService.getDevices().then(resp => {
            if (resp.result) {
                setDevices(resp.result);
            }
        })
        return () => setDevices([]);
    }, []);


    const handleSelectAll = (event) => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(devices.map(li => li.id));
        if (isCheckAll) {
            setIsCheck([]);
        }
    };

    const handleClick = (event) => {
        const { id, checked } = event.target
        setIsCheck([...isCheck, id]);
        if (!checked) {
            setIsCheck(isCheck.filter(item => item !== id));
        }
    }


    const handleSearch = (event) => {
        DeviceService.searchDevice(event.target.value).then(resp => {
            if (resp.result) {
                setDevices(resp.result);
            }
        })
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const handleExport = (event) => {
        event.preventDefault();
        Utils.downloadFile({
            data: JSON.stringify(devices),
            fileName: 'devices.export.json',
            fileType: 'text/json',
        })
    }

    return (
        <React.Fragment>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth={false}>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                        }}
                    >
                        <Typography
                            sx={{ m: 1 }}
                            variant="h4"
                        >
                            设备实例
                        </Typography>
                        <Box sx={{ m: 1 }}>
                            <Button
                                startIcon={(<DownloadIcon fontSize="small" />)}
                                sx={{ mr: 1 }}
                                onClick={handleExport}
                            >
                                导出
                            </Button>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={e => navigate('/devices/new', { replace: true })}
                            >
                                添加设备
                            </Button>
                        </Box>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        <Card>
                            <CardContent>
                                <Box sx={{ maxWidth: 500 }}>
                                    <TextField
                                        fullWidth
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                        placeholder="Search Device"
                                        variant="outlined"
                                        onChange={handleSearch}
                                    />
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                    <Box sx={{ mt: 3 }}>
                        <Card>
                            <Box sx={{ minWidth: 800 }}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                <Checkbox
                                                    size="small"
                                                    onChange={handleSelectAll}
                                                    checked={isCheckAll}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                Device Name
                                            </TableCell>
                                            <TableCell>
                                                Label
                                            </TableCell>
                                            <TableCell>
                                                Location
                                            </TableCell>
                                            <TableCell sortDirection="desc">
                                                Create Date
                                            </TableCell>
                                            <TableCell>
                                                Status
                                            </TableCell>
                                            <TableCell>
                                                Action
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {devices
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((device) => (
                                                <TableRow
                                                    hover
                                                    key={device.id}
                                                    selected={isCheck.includes(device.id)}
                                                >
                                                    <TableCell>
                                                        <Checkbox
                                                            id={device.id}
                                                            size="small"
                                                            onChange={handleClick}
                                                            checked={isCheck.includes(device.id)}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Link underline="always" onClick={(e) => navigate(`/devices/${device.id}/info`, { replace: true })}>
                                                            <Typography fontWeight="bold" variant="body2">
                                                                {device.name}
                                                            </Typography>
                                                        </Link>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Chip label={device.label} />
                                                    </TableCell>
                                                    <TableCell>
                                                        {device.location}
                                                    </TableCell>
                                                    <TableCell>
                                                        {device.created_at}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Chip
                                                            label={
                                                                <Typography variant="body2" fontWeight="bold">{device.status}</Typography>
                                                            }
                                                            color={device.status === "running" ? "success" : "error"}
                                                            variant="outlined"
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <ActionMenu
                                                            id={device.id}
                                                            status={device.status}
                                                            isLoading={isLoading}
                                                            setIsLoading={setIsLoading}
                                                            devices={devices}
                                                            setDevices={setDevices}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                                <Divider />
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    component="div"
                                    count={devices.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </Box>
                        </Card>
                    </Box>
                </Container>
            </Box >
        </React.Fragment >
    )
}