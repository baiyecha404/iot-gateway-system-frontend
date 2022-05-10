import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Container, Box, Card, CardHeader, IconButton, Divider, CardContent, Button, Tab,
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Tooltip, Avatar
} from "@mui/material";
import { TabList, TabContext, TabPanel } from "@mui/lab";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import UserInfo from './UserInfo';
import UserPassword from './UserPassword';
import UserLog from './UserLog';
import UserAuthorization from "./UserAuthorization";

export default function UserDetail(props) {
    const { userId } = props;
    const { tab } = useParams();
    const [openDialog, setOpenDialog] = useState(false);
    const [currentTab, setCurrentTab] = useState("info");
    const navigate = useNavigate();


    useEffect(() => {
        const tabs = ["info", "password", "log", "authorization"];
        if (tab && tabs.includes(tab)) {
            setCurrentTab(tab);
        }
    }, [tab])


    const handleChange = (event, newValue) => {
        navigate(`/users/${userId}/${newValue}`, { replace: true });
    };

    const handleClose = (event) => {
        setOpenDialog(false);
    }

    const handleDelete = (event) => {
        setOpenDialog(true);
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
                            title="用户信息"
                            subheader={`Id: ${userId}`}
                            avatar={<Avatar />}
                            sx={{
                                height: 100,
                            }}
                            action={
                                (
                                    <React.Fragment>
                                        <Tooltip title="go back to devices">
                                            <IconButton aria-label="settings" onClick={e => navigate('/users', { replace: true })}>
                                                <ArrowBackIcon />
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
                                    <Tab label="信息" value="info" />
                                    <Tab label="密码" value="password" />
                                    <Tab label="日志" value="log" />
                                    <Tab label="授权" value="authorization" />
                                </TabList>
                                <TabPanel value="info">
                                    <UserInfo userId={userId} />
                                </TabPanel>
                                <TabPanel value="password">
                                    <UserPassword userId={userId} />
                                </TabPanel>
                                <TabPanel value="log">
                                    <UserLog userId={userId} />
                                </TabPanel>
                                <TabPanel value="authorization">
                                    <UserAuthorization userId={userId} />
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
                                如点击确认，该用户(user Id: {userId})及历史信息都将被删除。
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>返回</Button>
                            <Button onClick={handleDelete} autoFocus>
                                确认
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Container>
            </Box>
        </React.Fragment >
    )
}