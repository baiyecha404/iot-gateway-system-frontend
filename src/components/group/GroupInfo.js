import React, { useContext } from 'react';
import { MessageContext } from '../DashBoard';
import { List, ListItemText, ListItem, Typography, TextField, Divider, Button } from "@mui/material";
import GroupService from '../../api/Group';

export default function GroupInfo(props) {
    const { setSuccess, setError } = useContext(MessageContext)
    const { groupId, group, setGroup, setUpdate } = props;

    const handleGroupUpdate = (event) => {
        GroupService.updateGroup(groupId, group.name, group.type, group.description).then(resp => {
            if (resp.result) {
                setSuccess(resp.result);
                setUpdate(true);
            }

            if (resp.error) {
                setError(resp.error);
            }
        })
    }

    return (
        <React.Fragment>
            <List disablePadding>
                <ListItem sx={{ py: 1, px: 0, width: 560 }}>
                    <ListItemText primary={<Typography variant="body2" fontWeight="bold">名称</Typography>} />
                    <TextField
                        variant="outlined"
                        value={group.name}
                        onChange={e => setGroup({ ...group, name: e.target.value })}
                        sx={{ width: 300 }}
                    />
                </ListItem>
                <ListItem sx={{ py: 1, px: 0, width: 560 }}>
                    <ListItemText primary={<Typography variant="body2" fontWeight="bold">类型</Typography>} />
                    <TextField
                        variant="outlined"
                        value={group.type}
                        onChange={e => setGroup({ ...group, type: e.target.value })}
                        sx={{ width: 300 }}
                    />
                </ListItem>
                <ListItem sx={{ py: 1, px: 0, width: 560 }}>
                    <ListItemText primary={<Typography variant="body2" fontWeight="bold">描述</Typography>} />
                    <TextField
                        variant="outlined"
                        rows={3}
                        multiline
                        value={group.description}
                        onChange={e => setGroup({ ...group, description: e.target.value })}
                        sx={{ width: 300 }}
                    />
                </ListItem>
                <Divider />
            </List>
            <Button
                variant="contained"
                sx={{ my: 3 }}
                onClick={handleGroupUpdate}
            >
                更新
            </Button>
        </React.Fragment>
    )
}