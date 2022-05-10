import React, { useEffect, useState } from "react";
import { Typography, List, ListItem, ListItemText } from "@mui/material";
import AuthService from "../../api/Auth";
import UserService from "../../api/User";

export default function ChannelSummary(props) {
    const { name } = props;

    const [userId, setUserId] = useState("")

    useEffect(() => {
        UserService.getUserInfo(AuthService.getCurrentUser()).then(resp => {
            if (resp.result) {
                setUserId(resp.result.user_id);
            }
        });
    }, [])


return (
    <React.Fragment>
        <Typography variant="h6" gutterBottom>
            设备细节
        </Typography>
        <List disablePadding>
            <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Channel Name" />
                <Typography variant="body2">{name}</Typography>
            </ListItem>
            <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Created User id" />
                <Typography variant="body2">{userId}</Typography>
            </ListItem>
        </List>
    </React.Fragment>
)
}