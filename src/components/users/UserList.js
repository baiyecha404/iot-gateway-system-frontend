import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box, Card, Container, Table, TableCell, TableRow, TableHead, CardHeader, TextField, InputAdornment,
    TableBody, Checkbox, Link, Divider, TablePagination, Button, Tooltip, Typography, Chip
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import UserActionMenu from "./ActionMenu";
import UserService from "../../api/User";
import Utils from '../../utils/Utils';

export default function Users() {

    const [users, setUsers] = useState([]);
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        UserService.getUsers().then(resp => {
            if (resp.result) {
                setUsers(resp.result);
            }
        })
        return () => setUsers([]);
    }, [])

    const handleSelectAll = (event) => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(users.map(li => li.user_id));
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
        UserService.searchUser(event.target.value).then(resp => {
            if (resp.result) {
                setUsers(resp.result);
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
            data: JSON.stringify(users),
            fileName: 'users.export.json',
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
                    <Box sx={{ mt: 3 }}>
                        <Card>
                            <CardHeader
                                title="用户"
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
                                                id="outlined-search" label="Search for User" type="search"
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
                                                <Tooltip title="export users">
                                                    <Button
                                                        startIcon={(<DownloadIcon fontSize="small" />)}
                                                        color="primary"
                                                        variant="contained"
                                                        sx={{ ml: 4, mr: 1 }}
                                                        onClick={handleExport}
                                                    >
                                                        导出
                                                    </Button>
                                                </Tooltip>
                                            </Box>

                                        </Box>
                                    </React.Fragment>
                                }
                            />
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
                                                UserName
                                            </TableCell>
                                            <TableCell>
                                                Phone Number
                                            </TableCell>
                                            <TableCell>
                                                User Role
                                            </TableCell>
                                            <TableCell>
                                                Registration date
                                            </TableCell>
                                            <TableCell>
                                                Actions
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {users
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map(user => (
                                                <TableRow
                                                    hover
                                                    key={user.user_id}
                                                    selected={isCheck.includes(user.user_id)}
                                                >
                                                    <TableCell>
                                                        <Checkbox
                                                            id={user.user_id}
                                                            size="small"
                                                            onChange={handleClick}
                                                            checked={isCheck.includes(user.user_id)}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Link underline="always" onClick={(e) => navigate(`/users/${user.user_id}/info`, { replace: true })}>
                                                            <Typography variant="body2" fontWeight="bold">{user.username}</Typography>
                                                        </Link>
                                                    </TableCell>
                                                    <TableCell>
                                                        {user.phone_number}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Chip label={user.role}></Chip>
                                                    </TableCell>
                                                    <TableCell>
                                                        {user.created_at}
                                                    </TableCell>
                                                    <TableCell>
                                                        <UserActionMenu
                                                            id={user.user_id}
                                                            users={users}
                                                            setUsers={setUsers}
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
                                    count={users.length}
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