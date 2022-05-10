import React, { useState, useContext } from 'react';
import { MessageContext } from '../DashBoard';
import { useNavigate } from 'react-router-dom';
import {
    IconButton, Menu, MenuItem, Divider, ListItemIcon, Dialog, DialogTitle, DialogActions,
    DialogContent, DialogContentText, Button
} from '@mui/material';
import { red } from "@mui/material/colors";
import InfoIcon from '@mui/icons-material/Info';
import MoreIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import UserService from '../../api/User';

export default function UserActionMenu(props) {
    const { setSuccess, setError } = useContext(MessageContext)
    const { id, users, setUsers } = props;
    const [anchorElOption, setAnchorElOption] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const navigate = useNavigate();


    const handleOpenMenu = (event) => {
        setAnchorElOption(event.currentTarget);
    };

    const handleCloseMenu = (event) => {
        setAnchorElOption(null);
    }


    const handleUserInfo = (event) => {
        navigate(`/users/${id}/info`, { replace: true })
    }


    const handleUserDelete = (event) => {
        setOpenDialog(true);
        setAnchorElOption(null);

    }

    const handleClose = (event) => {
        setOpenDialog(false);
    }

    const deleteUser = (event) => {
        UserService.deleteUser(id).then(resp => {
            if (resp.result) {
                setOpenDialog(false);
                setUsers(users.filter(user => user.user_id !== id))
                setSuccess("User deleted successfully!");
            } else {
                setError("Action Delete failed!")
            }
        })
    }

    return (
        <React.Fragment>
            <IconButton
                size="large"
                aria-label="display more actions"
                edge="end"
                color="inherit"
                onClick={handleOpenMenu}
            >
                <MoreIcon />
            </IconButton>
            <Menu
                sx={{ mt: '45px' }}
                anchorEl={anchorElOption}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElOption)}
                onClose={handleCloseMenu}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
            >
                <div key={"stopped" + Math.random() * 100}>
                    <MenuItem onClick={handleUserInfo}>
                        <ListItemIcon>
                            <InfoIcon fontSize="small" />
                        </ListItemIcon>
                        User info
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleUserDelete}>
                        <ListItemIcon>
                            <DeleteIcon fontSize="small" sx={{ color: red[700] }} />
                        </ListItemIcon>
                        Delete User
                    </MenuItem>
                </div>
            </Menu >
            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure to delete this user?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        如点击确认，该用户(User Id: {id})及历史信息都将被删除。
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>返回</Button>
                    <Button onClick={deleteUser} autoFocus>
                        确认
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment >
    )
}