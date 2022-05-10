import React, { useState, useContext } from 'react';
import { MessageContext } from '../DashBoard';
import { useNavigate } from 'react-router-dom';
import {
    IconButton, Menu, MenuItem, Divider, ListItemIcon, Dialog, DialogTitle, DialogActions,
    DialogContent, DialogContentText, Button
} from '@mui/material';
import { red } from "@mui/material/colors";
import InfoIcon from '@mui/icons-material/Info';
import StopIcon from '@mui/icons-material/Stop';
import MoreIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import LooksIcon from '@mui/icons-material/Looks';
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';
import DeviceService from '../../api/Device';

export default function ActionMenu(props) {
    const { setSuccess, setError } = useContext(MessageContext)
    const { id, status, isLoading, setIsLoading, devices, setDevices } = props;
    const [anchorElOption, setAnchorElOption] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const navigate = useNavigate();


    const handleOpenMenu = (event) => {
        setAnchorElOption(event.currentTarget);
    };

    const handleCloseMenu = (event) => {
        setAnchorElOption(null);
    }


    const handleServerInfo = (event) => {
        navigate(`/devices/${id}/info`, { replace: true })
    }

    const handleServerStart = (event) => {
        setIsLoading([...isLoading, id]);
        setAnchorElOption(null);
        DeviceService.startDevice(id).then(resp => {
            if (resp) {
                setDevices(devices.map(item => {
                    if (item.id === id) {
                        item.status = "running";
                    }
                    return item;
                }))
                setSuccess("Device started successfully!");
            } else {
                setError("Action Start failed!")
            }
            setIsLoading(isLoading.filter(item => item !== id));
        })
    }

    const handleServerStop = (event) => {
        setIsLoading([...isLoading, id]);
        setAnchorElOption(null);
        DeviceService.stopDevice(id).then(resp => {
            if (resp) {
                setDevices(devices.map(item => {
                    if (item.id === id) {
                        item.status = "stopped";
                    }
                    return item;
                }))
                setSuccess("Device stopped successfully!");
            } else {
                setError("Action Stop failed!")
            }
            setIsLoading(isLoading.filter(item => item !== id));
        })
    }


    const deleteDevice = (event) => {
        DeviceService.deleteDevice(id).then(resp => {
            if (resp.result) {
                setOpenDialog(false);
                setDevices(devices.filter(item => item.id !== id))
                setSuccess("Device deleted successfully!");
            } else {
                setError("Action Delete failed!")
            }
        })
    }

    const handleServerDelete = (event) => {
        setOpenDialog(true);
        setAnchorElOption(null);
    }

    const handleClose = (event) => {
        setOpenDialog(false);
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
                {status === "stopped" ? (
                    <div key={"stopped" + Math.random() * 100}>
                        <MenuItem onClick={handleServerInfo}>
                            <ListItemIcon>
                                <InfoIcon fontSize="small" />
                            </ListItemIcon>
                            Server info
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleServerStart}>
                            <ListItemIcon>
                                <PlayCircleOutlineRoundedIcon fontSize="small" />
                            </ListItemIcon>
                            Start Server
                        </MenuItem>
                        <MenuItem onClick={handleServerDelete}>
                            <ListItemIcon>
                                <DeleteIcon fontSize="small" sx={{ color: red[700] }} />
                            </ListItemIcon>
                            Delete Server
                        </MenuItem>
                    </div>) : (
                    <div key={"started" + Math.random() * 100}>
                        <MenuItem onClick={e => navigate(`/channels`, { replace: true })}>
                            <ListItemIcon>
                                <LooksIcon fontSize="small" />
                            </ListItemIcon>
                            Create Channels
                        </MenuItem>
                        <MenuItem onClick={handleServerStop}>
                            <ListItemIcon>
                                <StopIcon fontSize="small" />
                            </ListItemIcon>
                            Stop Server
                        </MenuItem>
                    </div>
                )}
            </Menu >
            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure to delete this server?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        如点击确认，该设备(device Id: {id})及历史信息都将被删除。
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>返回</Button>
                    <Button onClick={deleteDevice} autoFocus>
                        确认
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment >
    )
}