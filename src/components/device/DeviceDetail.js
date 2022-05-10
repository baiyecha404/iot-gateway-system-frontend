import React, { useState, useEffect, useContext } from "react";
import { MessageContext } from "../DashBoard";
import { useParams, useNavigate } from "react-router-dom";
import {
    Container, Box, Card, CardHeader, IconButton, Divider, CardContent, Button, Tab,
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Tooltip
} from "@mui/material";
import { TabList, TabContext, TabPanel } from "@mui/lab";
import DevicesIcon from '@mui/icons-material/Devices';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import DeviceService from '../../api/Device';
import DeviceInfo from './DeviceInfo';
import DeviceAttribute from "./DeviceAttribute";
import DeviceConnection from "./DeviceConnection";
import DevicePolicy from './DevicePolicy';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';


export default function DeviceDetail(props) {
    const { setSuccess, setError } = useContext(MessageContext)
    const { deviceId } = props;
    const [openDialog, setOpenDialog] = useState(false);
    const [currentTab, setCurrentTab] = useState("info");

    const navigate = useNavigate()
    const { tab } = useParams();

    useEffect(() => {
        const tabs = ["info", "connection", "attributes", "policies"];
        if (tab && tabs.includes(tab)) {
            setCurrentTab(tab);
        }
        
    }, [tab])
 

    const handleChange = (event, newValue) => {
        navigate(`/devices/${deviceId}/${newValue}`, { replace: true });
    };

    const handleClose = (event) => {
        setOpenDialog(false);
    }

    const handleDelete = (event) => {
        setOpenDialog(true);
    }

    const handleServerStart = (event) => {
        DeviceService.startDevice(deviceId).then(resp => {
            if (resp) {
                setSuccess("Successfully started device");
            } else {
                setError("Error starting device");
            }
        })
    }

    const handleServerStop = (event) => {
        DeviceService.stopDevice(deviceId).then(resp => {
            if (resp) {
                setSuccess("Successfully stopped device");
            } else {
                setError("Error stopping device");
            }
        })
    }

    const deleteDevice = (event) => {
        DeviceService.deleteDevice(deviceId).then(resp => {
            if (resp.result) {
                setOpenDialog(false);
                navigate('/devices', { replace: true })
            } else {
                setError("Error deleting device");
            }
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
                            title="设备信息"
                            subheader={`Id: ${deviceId}`}
                            avatar={<DevicesIcon />}
                            sx={{
                                height: 100,
                            }}
                            action={
                                (
                                    <React.Fragment>
                                        <Tooltip title="go back to devices">
                                            <IconButton aria-label="settings" onClick={e => navigate('/devices', { replace: true })}>
                                                <ArrowBackIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="start device">
                                            <IconButton aria-label="x" onClick={handleServerStart}>
                                                <PlayCircleOutlineRoundedIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="stop device">
                                            <IconButton aria-label="x" onClick={handleServerStop}>
                                                <StopCircleOutlinedIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="delete device">
                                            <IconButton aria-label="x" onClick={handleDelete}>
                                                <DeleteIcon color="error" />
                                            </IconButton>
                                        </Tooltip>
                                    </React.Fragment>
                                )
                            }
                        />
                        <Divider />
                        <CardContent>
                            <TabContext value={currentTab}>
                                <TabList
                                    onChange={handleChange}
                                    textColor="primary"
                                    indicatorColor="primary"
                                    aria-label="secondary tabs example"
                                >
                                    <Tab label="配置" value="info" />
                                    <Tab label="属性" value="attributes" />
                                    <Tab label="连接" value="connection" />
                                    <Tab label="策略" value="policies" />
                                </TabList>
                                <TabPanel value="info">
                                    <DeviceInfo deviceId={deviceId} />
                                </TabPanel>
                                <TabPanel value="attributes">
                                    <DeviceAttribute deviceId={deviceId} />
                                </TabPanel>
                                <TabPanel value="connection">
                                    <DeviceConnection deviceId={deviceId} />
                                </TabPanel>
                                <TabPanel value="policies">
                                    <DevicePolicy deviceId={deviceId}/>
                                </TabPanel>
                            </TabContext>
                        </CardContent>
                    </Card>
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
                                如点击确认，该设备(device Id: {deviceId})及历史信息都将被删除。
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>返回</Button>
                            <Button onClick={deleteDevice} autoFocus>
                                确认
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Container>
            </Box>
        </React.Fragment >
    )
}