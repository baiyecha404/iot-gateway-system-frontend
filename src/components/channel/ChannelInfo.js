import React, { useState, useEffect, useContext } from "react";
import { MessageContext } from "../DashBoard";
import {
    Divider, Grid, Typography, List,
    ListItemButton, ListItemText, TextField, Button
} from "@mui/material";
import ChannelService from '../../api/Channel';

export default function ChannelInfo(props) {
    const { setSuccess, setError } = useContext(MessageContext)
    const { channelId } = props;
    const [shouldUpdate, setShouldUpdate] = useState(true);
    const [channel, setChannel] = useState({
        id: "",
        name: "",
        owner: ""
    });

    useEffect(() => {
        if (shouldUpdate) {
            ChannelService.getChannelInfo(channelId).then(resp => {
                if (resp.result) {
                    setChannel(resp.result);
                }
            }).then(() => {
                setShouldUpdate(false);
            })
        }
    }, [channelId, shouldUpdate])


    const handleChannelUpdate = (event) => {
        event.preventDefault();
        ChannelService.updateChannel(channelId, channel.name).then(resp => {
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
                spacing={3}
                wrap="wrap"
            >
                <Grid
                    item
                    md={8}
                    sm={10}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                    xs={12}
                >
                    <List >
                        <ListItemButton sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={<Typography variant="body2" fontWeight="bold" >Name</Typography>} />
                            <TextField
                                id="channel-name"
                                label="Channel Name"
                                value={channel.name}
                                onChange={e => setChannel({ ...channel, name: e.target.value })}
                            />
                        </ListItemButton>
                        <ListItemButton sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={<Typography variant="body2" fontWeight="bold" >Channel Id</Typography>} />
                            <Typography variant="body1">{channel.id}</Typography>
                        </ListItemButton>
                        <ListItemButton sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={<Typography variant="body2" fontWeight="bold" >Owned User</Typography>} />
                            <Typography variant="body1">{channel.owner}</Typography>
                        </ListItemButton>

                    </List>
                    <Divider />
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={handleChannelUpdate}
                    >
                        更新
                    </Button>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}