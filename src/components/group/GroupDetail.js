import React, { useState, useEffect, useContext } from "react";
import { MessageContext } from "../DashBoard";
import { useParams, useNavigate } from "react-router-dom";
import {
    Container, Box, Card, CardHeader, IconButton, Divider, CardContent, Button, Tab,
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Tooltip
} from "@mui/material";
import { TabList, TabContext, TabPanel } from "@mui/lab";
import GroupsIcon from '@mui/icons-material/Groups';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import GroupService from '../../api/Group';
import GroupInfo from "./GroupInfo";
import GroupMembers from "./GroupMembers";
import GroupPolicy from "./GroupPolicy";


export default function DeviceDetail(props) {
    const { setError } = useContext(MessageContext)
    const { groupId } = props;
    const { tab } = useParams();
    const [openDialog, setOpenDialog] = useState(false);
    const [currentTab, setCurrentTab] = useState("info");
    const [shouldUpdate, setShouldUpdate] = useState(true);
    const [group, setGroup] = useState({
        name: "",
        description: "",
        members: []
    })
    const navigate = useNavigate()

    useEffect(() => {
        const tabs = ["info", "policies", "members"];
        if (tab && tabs.includes(tab)) {
            setCurrentTab(tab);
        }
    }, [tab])


    useEffect(() => {
        if (shouldUpdate) {
            GroupService.getGroupInfo(groupId).then(resp => {
                if (resp.result) {
                    setGroup(resp.result);
                }
            }).then(() => {
                setShouldUpdate(false);
            })
        }
        return () => setShouldUpdate(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shouldUpdate])


    const handleChange = (event, newValue) => {
        navigate(`/groups/${groupId}/${newValue}`, { replace: true });
    };

    const handleClose = (event) => {
        setOpenDialog(false);
    }

    const handleDelete = (event) => {
        setOpenDialog(true);
    }


    const deleteGroup = (event) => {
        GroupService.deleteGroup(groupId).then(resp => {
            if (resp.result) {
                setOpenDialog(false);
                navigate('/groups', { replace: true })
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
                            title="用户组信息"
                            subheader={`Id: ${groupId}`}
                            avatar={<GroupsIcon />}
                            sx={{
                                height: 100,
                            }}
                            action={
                                (
                                    <React.Fragment>
                                        <Tooltip title="go back to groups">
                                            <IconButton aria-label="settings" onClick={e => navigate('/groups', { replace: true })}>
                                                <ArrowBackIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="delete group">
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
                                >
                                    <Tab label="信息" value="info" />
                                    <Tab label="成员" value="members" />
                                    <Tab label="策略" value="policies" />
                                </TabList>
                                <TabPanel value="info">
                                    <GroupInfo
                                        groupId={groupId}
                                        group={group}
                                        setGroup={setGroup}
                                        setUpdate={setShouldUpdate}
                                    />
                                </TabPanel>
                                <TabPanel value="members">
                                    <GroupMembers
                                        groupId={groupId}
                                        group={group}
                                        setUpdate={setShouldUpdate}
                                    />
                                </TabPanel>
                                <TabPanel value="policies">
                                    <GroupPolicy
                                        groupId={groupId}
                                    />
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
                                如点击确认，该用户组(group Id: {groupId})及历史信息都将被删除。
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>返回</Button>
                            <Button onClick={deleteGroup} autoFocus>
                                确认
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Container>
            </Box>
        </React.Fragment >
    )
}