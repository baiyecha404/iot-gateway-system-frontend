import React, { useState, useContext } from 'react';
import { MessageContext } from '../DashBoard';
import { useNavigate } from 'react-router-dom';
import {
    Table, TableHead, TableCell, Link, Box, Chip, TableRow, TableBody, TablePagination,
    Divider, Button, Typography, IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddGroupMember from './AddGroupMember';
import GroupService from '../../api/Group';

export default function GroupMembers(props) {
    const { setSuccess, setError } = useContext(MessageContext);
    const { groupId, group, setUpdate } = props;
    const [dialogOpen, setDialogOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const navigate = useNavigate();


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleButtonClick = (event) => {
        setDialogOpen(true);
    }

    const handleRemoveMember = (user_id) => {
        GroupService.removeGroupMember(groupId, user_id).then(resp => {
            if (resp.result) {
                setSuccess(resp.result)
                setUpdate(true);
            }

            if (resp.error) {
                setError(resp.error)
            }
        })
    }

    return (
        <React.Fragment>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Member Id
                        </TableCell>
                        <TableCell>
                            Name
                        </TableCell>
                        <TableCell>
                            Phone Number
                        </TableCell>
                        <TableCell>
                            Action
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {group.members
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map(member => (
                            <TableRow key={member.user_id}>
                                <TableCell>
                                    <Link underline="always" onClick={(e) => navigate(`/users/${member.user_id}/info`, { replace: true })}>
                                        <Typography fontWeight="bold" variant="body2">
                                            {member.user_id}
                                        </Typography>
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Chip label={member.username} color="primary" variant="outlined" />
                                </TableCell>
                                <TableCell>
                                    {member.phone_number}
                                </TableCell>
                                <TableCell>
                                    <IconButton aria-label="x" onClick={e => handleRemoveMember(member.user_id)}>
                                        <DeleteIcon />
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
                count={group.members.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    p: 2
                }}
            >
                <Button
                    color="primary"
                    variant="contained"
                    onClick={handleButtonClick}
                >
                    添加新成员
                </Button>
            </Box>
            {dialogOpen && <AddGroupMember
                groupId={groupId}
                members={group.members}
                open={dialogOpen}
                setOpen={setDialogOpen}
                setUpdate={setUpdate}
            />}
        </React.Fragment>
    )
}