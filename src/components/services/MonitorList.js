import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Checkbox, Card, Box, Container, CardHeader, Table, TableHead, TableCell, Link, Chip,
    TableRow, TableBody, TableContainer, TablePagination, Divider, TextField, InputAdornment, Button,
    Typography
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Utils from "../../utils/Utils";


export default function MonitorList(props) {
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const navigate = useNavigate();

    const monitors = [
        { "id": "1", "name": "monitor1", "created_user": "admin", "status": "正常", "type": "监控", "label": "视频监控", "created_at": "2020-05-05 12:12:12" },
        { "id": "2", "name": "monitor2", "created_user": "admin", "status": "正常", "type": "监控", "label": "视频监控", "created_at": "2020-06-05 12:12:12" },
    ]


    const handleSelectAll = (event) => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(monitors.map(li => li.id));
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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const handleSearch = (event) => {

    }

    const handleExport = (event) => {
        event.preventDefault();
        Utils.downloadFile({
            data: JSON.stringify(monitors),
            fileName: 'monitors.export.json',
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
                <Container maxWidth="bg">
                    <Card>
                        <CardHeader
                            title="监控列表"
                            action={
                                <React.Fragment>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            p: 1,
                                            flexWrap: 'wrap',
                                        }}
                                    >
                                        <TextField
                                            id="outlined-search" label="Search for Monitor" type="search"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <SearchIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            onChange={handleSearch}
                                        />

                                        <Box sx={{ m: 1 }}>
                                            <Button
                                                color="primary"
                                                variant="outlined"
                                                sx={{ ml: 4, mr: 1 }}
                                                onClick={e => navigate('new')}
                                            >
                                                添加监控
                                            </Button>
                                            <Button
                                                color="primary"
                                                variant="contained"
                                                sx={{ mr: 1 }}
                                                onClick={handleExport}
                                            >
                                                导出
                                            </Button>
                                        </Box>
                                    </Box>
                                </React.Fragment>
                            }
                        />
                        <Box sx={{ minWidth: 800 }}>
                            <TableContainer>
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
                                                Name
                                            </TableCell>
                                            <TableCell>
                                                Created User
                                            </TableCell>
                                            <TableCell>
                                                Label
                                            </TableCell>
                                            <TableCell>
                                                Status
                                            </TableCell>
                                            <TableCell sortDirection="desc">
                                                Create Date
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {monitors
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((monitor) => (
                                                <TableRow
                                                    hover
                                                    key={monitor.id}
                                                    selected={isCheck.includes(monitor.id)}
                                                >
                                                    <TableCell>
                                                        <Checkbox
                                                            id={monitor.id}
                                                            size="small"
                                                            onChange={handleClick}
                                                            checked={isCheck.includes(monitor.id)}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Link underline="always" onClick={(e) => navigate(`/monitors/1/`, { replace: true })}>

                                                            <Typography fontWeight="bold" variant="body2">
                                                                {monitor.name}
                                                            </Typography>
                                                        </Link>
                                                    </TableCell>
                                                    <TableCell>
                                                        {monitor.created_user}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Chip label={monitor.label} color="primary" variant="outlined" />
                                                    </TableCell>
                                                    <TableCell>
                                                        {monitor.status}
                                                    </TableCell>
                                                    <TableCell>
                                                        {monitor.created_at}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Divider />
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={monitors.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Box>
                    </Card>
                </Container>
            </Box>
        </React.Fragment >
    )

}