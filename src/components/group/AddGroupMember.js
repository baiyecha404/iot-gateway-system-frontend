import React, { useState, useEffect, useContext } from 'react';
import { MessageContext } from '../DashBoard';
import {
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Grid, TextField, Button,
    MenuItem
} from '@mui/material';
import UserService from '../../api/User';
import GroupService from '../../api/Group';

export default function AddGroupMember(props) {
    const { setSuccess, setError } = useContext(MessageContext);
    const { groupId, members, open, setOpen, setUpdate } = props;
    const [users, setUsers] = useState([]);
    const [member, setMember] = useState('');

    useEffect(() => {
        UserService.getUsers().then(resp => {
            if (resp.result) {
                setUsers(resp.result);
            }
        })
        return () => setUsers([]);
    }, [])

    const handleAddMember = (event) => {
        setOpen(false);
        GroupService.addGroupMember(groupId, member).then(resp => {
            if (resp.result) {
                setSuccess(resp.result);
                setUpdate(true);
            }

            if (resp.err) {
                setError(resp.err);
            }
        })
    }


    return (
        <Dialog open={open} onClose={e => setOpen(false)}
            fullWidth
            maxWidth={'sm'}>
            <DialogTitle>Add Member</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    请选择添加的成员
                </DialogContentText>
                <Grid container wrap="wrap" spacing={2}>
                    <Grid xs={12} item>
                        <TextField
                            id="name"
                            margin="dense"
                            label="Name"
                            fullWidth
                            variant="outlined"
                            select
                            value={member}
                            onChange={e => setMember(e.target.value)}
                        >
                            {users.map((user) => (
                                <MenuItem 
                                key={user.user_id} 
                                value={user.user_id}
                                disabled={members.find(m => m.user_id === user.user_id) !== undefined}
                                >
                                    {user.username} ( {user.user_id} )
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={e => setOpen(false)}>Cancel</Button>
                <Button variant="contained" onClick={handleAddMember}>Add</Button>
            </DialogActions>
        </Dialog>
    )
}