import React, { useEffect, useState, useContext } from "react";
import { MessageContext } from '../DashBoard';
import { useNavigate } from "react-router-dom";
import {
    Card, CardContent, Table, TextField, Typography, Button, Box, Container, InputAdornment,
    TableHead, TableRow, TableCell, Checkbox, TableBody, TablePagination, Divider, Link, IconButton,
    Chip
} from "@mui/material";
import { red } from "@mui/material/colors";
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import SearchIcon from '@mui/icons-material/Search';
import Utils from "../../utils/Utils";
import EditIcon from '@mui/icons-material/Edit';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddNewGroup from "./AddGroup";
import GroupService from '../../api/Group';

export default function GroupList() {
    const { setSuccess } = useContext(MessageContext)
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [shouldUpdate, setShouldUpdate] = useState(true);
    const [groups, setGroups] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const navigate = useNavigate();


    useEffect(() => {
        if (shouldUpdate) {
            GroupService.getGroups().then(resp => {
                if (resp.result) {
                    setGroups(resp.result);
                }
            }).then(() => {
                setShouldUpdate(false);
            })
        }
        return () => setShouldUpdate(false);
    }, [shouldUpdate])


    const handleSearch = (event) => {
        GroupService.searchGroup(event.target.value).then(resp => {
            if (resp.result) {
                setGroups(resp.result);
            }
        })
    }

    const handleDeleteGroup = (group_id) => {
        GroupService.deleteGroup(group_id).then(resp => {
            if (resp.result) {
                setSuccess(resp.result)
                setShouldUpdate(true);
            }
        })
    }

    const handleSelectAll = (event) => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(groups.map(li => li.id));
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


    const handleExport = (event) => {
        event.preventDefault();
        Utils.downloadFile({
            data: JSON.stringify(groups),
            fileName: 'groups.export.json',
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
                            用户组
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
                                onClick={e => setOpenDialog(true)}
                            >
                                Add Group
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
                                        placeholder="Search group"
                                        variant="outlined"
                                        onChange={handleSearch}
                                    />
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
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
                                                Group Id
                                            </TableCell>
                                            <TableCell>
                                                Group Name
                                            </TableCell>
                                            <TableCell>
                                                Group Type
                                            </TableCell>
                                            <TableCell>
                                                Group Description
                                            </TableCell>
                                            <TableCell>
                                                Member Number
                                            </TableCell>
                                            <TableCell>
                                                Actions
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {groups
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map(group => (
                                                <TableRow
                                                    hover
                                                    key={group.id}
                                                    selected={isCheck.includes(group.id)}
                                                >
                                                    <TableCell>
                                                        <Checkbox
                                                            id={group.id}
                                                            size="small"
                                                            onChange={handleClick}
                                                            checked={isCheck.includes(group.id)}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Link underline="always" onClick={(e) => navigate(`/groups/${group.id}`, { replace: true })}>
                                                            <Typography fontWeight="bold" variant="body2">
                                                                {group.id}
                                                            </Typography>
                                                        </Link>
                                                    </TableCell>
                                                    <TableCell>
                                                        {group.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Chip label={group.type} />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Chip label={group.description} />
                                                    </TableCell>
                                                    <TableCell>
                                                        {group.members.length}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Box sx={{
                                                            alignItems: 'center',
                                                            display: 'flex',
                                                            justifyContent: 'flex-start',
                                                            flexWrap: 'wrap',
                                                        }}>
                                                            <IconButton
                                                                onClick={e => navigate(`/groups/${group.id}/info`)}
                                                            >
                                                                <EditIcon fontSize="small" />
                                                            </IconButton>
                                                            <IconButton
                                                                onClick={e => navigate(`/groups/${group.id}/info`)}
                                                            >
                                                                <ArrowForwardIcon fontSize="small" />
                                                            </IconButton>
                                                            <IconButton onClick={e => handleDeleteGroup(group.id)}>
                                                                <DeleteIcon fontSize="small" sx={{ color: red[700] }} />
                                                            </IconButton>
                                                        </Box>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                                <Divider />
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    component="div"
                                    count={groups.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </Box>
                        </Card>
                        <AddNewGroup
                            open={openDialog}
                            setOpen={setOpenDialog}
                            setUpdate={setShouldUpdate}
                        />
                    </Box>
                </Container>
            </Box>
        </React.Fragment>
    )
}