import React, { useState, useEffect, useContext } from 'react';
import { MessageContext } from '../DashBoard';
import {
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Grid, TextField, Button,
    MenuItem
} from '@mui/material';
import UserService from '../../api/User';
import PolicyService from '../../api/Policy';

const actions = ["read", "write", "delete", "read/write", "*"]

export default function AddDevicePolicy(props) {
    const { setSuccess, setError } = useContext(MessageContext);
    const { deviceId, open, setOpen, setUpdate } = props;
    const [users, setUsers] = useState([]);
    const [subject, setSubject] = useState('');
    const [action, setAction] = useState('')

    useEffect(() => {
        UserService.getUsers().then(resp => {
            if (resp.result) {
                setUsers(resp.result);
            }
        })
    }, [])

    const handleAddPolicy = (event) => {
        setOpen(false);
        PolicyService.addDevicePolicy(subject, deviceId, action)
            .then(resp => {
                if (resp.result) {
                    setSuccess(resp.result)
                }

                if (resp.error) {
                    setError(resp.error)
                }
            }).then(() => {
                setUpdate(true)
            })
    }

    return (
        <Dialog open={open} onClose={e => setOpen(false)}
            fullWidth
            maxWidth={'sm'}>
            <DialogTitle>Add Policy</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    请配置添加的策略
                </DialogContentText>
                <Grid container wrap="wrap" spacing={2}>
                    <Grid xs={12} item>
                        <TextField
                            id="subject"
                            margin="dense"
                            label="Subject"
                            fullWidth
                            variant="outlined"
                            select
                            value={subject}
                            onChange={e => setSubject(e.target.value)}
                        >
                            {users.map((user) => (
                                <MenuItem
                                    key={user.user_id}
                                    value={user.user_id}
                                >
                                    {user.username} ( {user.user_id} )
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid xs={12} item>
                        <TextField
                            id="action"
                            margin="dense"
                            label="Action"
                            fullWidth
                            variant="outlined"
                            select
                            value={action}
                            onChange={e => setAction(e.target.value)}
                        >
                            {actions.map((action) => (
                                <MenuItem
                                    key={action}
                                    value={action}
                                >
                                    {action}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={e => setOpen(false)}>Cancel</Button>
                <Button variant="contained" onClick={handleAddPolicy}>Add</Button>
            </DialogActions>
        </Dialog>
    )
}