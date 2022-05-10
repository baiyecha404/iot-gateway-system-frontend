import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Card, CardContent, Table, TextField, Typography, Button, Box, Container, InputAdornment,
    TableHead, TableRow, TableCell, Checkbox, TableBody, TablePagination, Divider, Link, IconButton,
    Chip
} from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import SearchIcon from '@mui/icons-material/Search';
import Utils from "../../utils/Utils";
import MoreIcon from '@mui/icons-material/MoreVert';
import ElderService from "../../api/Elder";
import AuthService from '../../api/Auth';

export default function ElderCaring() {

    const [isAdmin, setIsAdmin] = useState(false);
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const [elders, setElders] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        setIsAdmin(AuthService.checkAdmin());
    }, [])    

    useEffect(() => {
        ElderService.getElders().then(resp => {
            if (resp.result) {
                setElders(resp.result)
            }
        })
    }, [])


    const handleSelectAll = (event) => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(elders.map(li => li.id));
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


    const renderStatus = (status) => {
        switch (status) {
            case "正常":
                return (
                    <Chip color='success' label={
                        <Typography variant='body2' fontWeight="bold"> {status}</Typography>
                    }>
                    </Chip>
                )
            case "警告":
                return (
                    <Chip color='warning' label={
                        <Typography variant='body2' fontWeight="bold"> {status}</Typography>
                    }>
                    </Chip>
                )
            case "危险":
                return (
                    <Chip color='error' label={
                        <Typography variant='body2' fontWeight="bold"> {status}</Typography>
                    }>
                    </Chip>
                )
            default:
                break
        }
    }

    const handleExport = (event) => {
        event.preventDefault();
        Utils.downloadFile({
            data: JSON.stringify(elders),
            fileName: 'elders.export.json',
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
                            The Elder
                        </Typography>
                        <Box sx={{ m: 1 }}>
                            <Button
                                startIcon={(<DownloadIcon fontSize="small" />)}
                                sx={{ mr: 1 }}
                                onClick={handleExport}
                            >
                                Export
                            </Button>
                            <Button
                                color="primary"
                                variant="contained"
                            >
                                Add Caring Elder
                            </Button>
                        </Box>
                    </Box>
                    {isAdmin && <Box sx={{ mt: 2 }}>
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
                                        placeholder="Search elder"
                                        variant="outlined"
                                    />
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>}

                    <Box sx={{ mt: 3 }}>
                        <Card>
                            <Box sx={{ minWidth: 1050 }}>
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
                                                Gender
                                            </TableCell>
                                            <TableCell>
                                                Age
                                            </TableCell>
                                            <TableCell>
                                                Phone Number
                                            </TableCell>
                                            <TableCell>
                                                Address
                                            </TableCell>
                                            <TableCell>
                                                Status
                                            </TableCell>
                                            <TableCell>
                                                Actions
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {elders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(elder => (
                                            <TableRow
                                                hover
                                                key={elder.id}
                                                selected={isCheck.includes(elder.id)}
                                            >
                                                <TableCell>
                                                    <Checkbox
                                                        id={elder.id}
                                                        size="small"
                                                        onChange={handleClick}
                                                        checked={isCheck.includes(elder.id)}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Link underline="always" onClick={(e) => navigate(`/elder-caring/${elder.id}`, { replace: true })}>
                                                        <Typography fontWeight="bold" variant="body2">
                                                            {elder.name}
                                                        </Typography>
                                                    </Link>
                                                </TableCell>
                                                <TableCell>
                                                    {elder.gender}
                                                </TableCell>
                                                <TableCell>
                                                    {elder.age}
                                                </TableCell>
                                                <TableCell>
                                                    {elder.phone_number}
                                                </TableCell>
                                                <TableCell>
                                                    {elder.address}
                                                </TableCell>
                                                <TableCell>
                                                    {renderStatus(elder.status)}
                                                </TableCell>
                                                <TableCell>
                                                    <IconButton
                                                        size="large"
                                                        aria-label="display more actions"
                                                        edge="end"
                                                        color="inherit"
                                                    >
                                                        <MoreIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <Divider />
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    component="div"
                                    count={elders.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </Box>
                        </Card>
                    </Box>
                </Container>
            </Box>
        </React.Fragment>
    )
}