import React, { useState, useContext } from 'react';
import { MessageContext } from '../DashBoard';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText, Grid,
    TextField,
} from '@mui/material';
import GroupService from '../../api/Group';


export default function AddNewGroup(props) {

    const { setSuccess } = useContext(MessageContext)
    const { open, setOpen, setUpdate } = props;
    const [groupName, setGroupName] = useState('');
    const [groupType, setGroupType] = useState('');
    const [groupDesc, setGroupDesc] = useState('');

    const handleClose = (event) => {
        setOpen(false);
    }

    const createGroup = (event) => {
        setOpen(false);
        GroupService.createGroup(groupName, groupType, groupDesc).then(resp => {
            if (resp.result) {
                setSuccess(resp.result);
                setUpdate(true);
            }
        })
    }

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle id="add-group-dialog" sx={{ m: 0, p: 2 }} >
                    {"Create New Group"}
                </DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>
                        请填写用户组相关信息
                    </DialogContentText>
                    <Grid container wrap="wrap" spacing={3} sx={{ my: 1 }} >
                        <Grid xs={12} item>
                            <TextField
                                autoFocus
                                id="name"
                                label="Group Name"
                                fullWidth
                                value={groupName}
                                onChange={e => setGroupName(e.target.value)}
                            />
                        </Grid>
                        <Grid xs={12} item>
                            <TextField
                                autoFocus
                                id="type"
                                label="Group Type"
                                fullWidth
                                value={groupType}
                                onChange={e => setGroupType(e.target.value)}
                            />
                        </Grid>
                        <Grid xs={12} item>
                            <TextField
                                autoFocus
                                id="description"
                                multiline
                                rows="5"
                                fullWidth
                                label="Description"
                                value={groupDesc}
                                onChange={e => setGroupDesc(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>返回</Button>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={createGroup}
                        autoFocus>
                        确认
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}