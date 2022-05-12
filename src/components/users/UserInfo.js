import React, { useState, useEffect, useContext } from "react";
import { MessageContext } from "../DashBoard";
import {
    Divider, Grid, Typography, List,
    ListItemButton, ListItemText, TextField, Button
} from "@mui/material";
import UserService from '../../api/User';

export default function UserInfo(props) {
    const { setSuccess, setError } = useContext(MessageContext)
    const { userId } = props;

    const [shouldUpdate, setShouldUpdate] = useState(true);
    const [user, setUser] = useState({
        user_id: "",
        username: "",
        created_at: "",
        phone_number: "",
        role: "",
        is_admin: "",
        last_login: "",
    });

    useEffect(() => {
        if (shouldUpdate) {
            UserService.getUserInfo(userId).then(resp => {
                if (resp.result) {
                    setUser(resp.result);
                }
            }).then(() => {
                setShouldUpdate(false);
            })
        }
        return () => setShouldUpdate(false);
    }, [userId, shouldUpdate])


    const handleUserUpdate = (event) => {
        event.preventDefault();
        UserService.updateUserInfo(userId, {
            username: user.username,
            phone_number: user.phone_number,
            group: user.group
        }).then(resp => {
            if (resp.result) {
                setError("");
                setSuccess(resp.result);
            }

            if (resp.err) {
                setSuccess("");
                setError(resp.err);
            }
        }).then(() => {
            setShouldUpdate(true);
        })
    }

    return (
        <React.Fragment>
            <Grid
                container
                spacing={6}
                wrap="wrap"
            >
                <Grid
                    item
                    md={6}
                    sm={6}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                    xs={12}
                >
                    <List >
                        <ListItemButton sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={<Typography variant="body2" fontWeight="bold">Name</Typography>} />
                            <TextField
                                id="user-name"
                                label="User Name"
                                value={user.username}
                                onChange={e => setUser({ ...user, username: e.target.value })}
                            />
                        </ListItemButton>
                        <ListItemButton sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={<Typography variant="body2" fontWeight="bold">Phone Number</Typography>} />
                            <TextField
                                id="user-phone-number"
                                label="User PhoneNumber"
                                value={user.phone_number}
                                onChange={e => setUser({ ...user, phone_number: e.target.value })}
                            />
                        </ListItemButton>
                        <ListItemButton sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={<Typography variant="body2" fontWeight="bold">Group</Typography>} />
                            <TextField
                                id="user-role"
                                label="User Role"
                                value={user.role}
                                onChange={e => setUser({ ...user, role: e.target.value })}
                            />
                        </ListItemButton>
                    </List>
                    <Divider />
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={handleUserUpdate}
                    >
                        更新
                    </Button>
                </Grid>
                <Grid
                    item
                    md={6}
                    sm={6}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                    xs={12}
                >
                    <List>
                        <ListItemButton sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={<Typography type="body2" fontWeight="bold" >IsAdmin</Typography>} />
                            <Typography variant="body1">{user.is_admin ? "True" : "False"}</Typography>
                        </ListItemButton>
                        <ListItemButton sx={{ py: 1, px: 0 }} >
                            <ListItemText primary={<Typography type="body2" fontWeight="bold" >Last Login</Typography>} />
                            <Typography variant="body1">{user.last_login === "" ? "NULL" : user.last_login}</Typography>
                        </ListItemButton>
                        <ListItemButton sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={<Typography type="body2" fontWeight="bold" >Registration Date</Typography>} />
                            <Typography variant="body1">{user.created_at}</Typography>
                        </ListItemButton>
                    </List>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}