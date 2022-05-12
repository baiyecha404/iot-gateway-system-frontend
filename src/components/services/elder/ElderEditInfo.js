import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MessageContext } from "../../DashBoard";
import {
    Card, CardHeader, CardContent, Divider, List, ListItemText, ListItem, Typography, Box, Button,
    TextField
} from "@mui/material";
import ElderService from "../../../api/Elder";

export default function ElderEditInfo(props) {
    const { setSuccess, setError } = useContext(MessageContext);
    const { elderId, info, setUpdate } = props;
    const [editInfo, setEditInfo] = useState({
        age: "",
        address: "",
    });
    const navigate = useNavigate();


    useEffect(() => {
        setEditInfo({ age: info.age, address: info.address });
    }, [info])

    const updateElderInfo = (event) => {
        ElderService.updateElderInfo(elderId, editInfo).then(resp => {
            if (resp.result) {
                setUpdate(true);
                setSuccess("Update Success")
                navigate(`/elder-caring/${elderId}/info`);
            }

            if (resp.err) {
                setError("Update Failed")
            }
        })
    }

    return (
        <React.Fragment>
            <Card>
                <CardHeader
                    title="编辑老人信息"
                />
                <Divider />
                <CardContent>
                    <List disablePadding>
                        <ListItem sx={{ py: 1, px: 0, width: 420 }}>
                            <ListItemText primary={<Typography variant="body2" fontWeight="bold">姓名</Typography>} />
                            <Typography variant="body2">{info.name}</Typography>
                        </ListItem>
                        <Divider />
                        <ListItem sx={{ py: 1, px: 0, width: 420 }}>
                            <ListItemText primary={<Typography variant="body2" fontWeight="bold">号码</Typography>} />
                            <Typography variant="body2">{info.phone_number}</Typography>
                        </ListItem>
                        <Divider />
                        <ListItem sx={{ py: 1, px: 0, width: 420 }}>
                            <ListItemText primary={<Typography variant="body2" fontWeight="bold">年龄</Typography>} />
                            <TextField
                                id="elder-age"
                                label="Elder Age"
                                value={editInfo.age}
                                onChange={e => setEditInfo({ ...editInfo, age: e.target.value })}
                            />
                        </ListItem>
                        <Divider />
                        <ListItem sx={{ py: 1, px: 0, width: 420 }}>
                            <ListItemText primary={<Typography variant="body2" fontWeight="bold">住址</Typography>} />
                            <TextField
                                id="elder-address"
                                label="Elder Address"
                                value={editInfo.address}
                                onChange={e => setEditInfo({ ...editInfo, address: e.target.value })}
                            />
                        </ListItem>
                    </List>
                    <Divider />
                    <Box sx={{ my: 3 }}>
                        <Button variant="contained" color="primary"
                            onClick={updateElderInfo}
                        >
                            更新
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}