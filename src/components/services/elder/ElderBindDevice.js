import React, { useState, useEffect, useContext } from "react";
import { MessageContext } from "../../DashBoard";
import {
    Dialog, DialogTitle, DialogContent, DialogContentText, Grid, TextField, DialogActions, Button,
    MenuItem
} from "@mui/material";
import DeviceService from "../../../api/Device";
import ElderService from "../../../api/Elder";

export default function ElderBindDevice(props) {

    const { setSuccess, setError } = useContext(MessageContext);
    const { elderId, devices, open, setOpen, setUpdate } = props;
    const [newDevice, setNewDevice] = useState('');
    const [allDevices, setAllDevices] = useState([]);

    useEffect(() => {
        DeviceService.getDevices().then(resp => {
            if (resp.result) {
                setAllDevices(resp.result);
            }
        })
    }, [])


    const handleBindDevice = (event) => {
        setOpen(false);
        ElderService.bindElderDevice(elderId, newDevice).then((resp) => {
            if (resp.result) {
                setSuccess(resp.result);
                setUpdate(true);
            }

            if (resp.err) {
                setError(resp.err);
            }
        })
    }


    return (
        <React.Fragment>
            <Dialog open={open} onClose={e => setOpen(false)}
                fullWidth
                maxWidth={'sm'}>
                <DialogTitle>Bind Device</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        请选择绑定的设备
                    </DialogContentText>
                    <Grid container wrap="wrap" spacing={2}>
                        <Grid xs={12} item>
                            <TextField
                                id="device"
                                margin="dense"
                                label="Device"
                                fullWidth
                                variant="outlined"
                                select
                                value={newDevice}
                                onChange={e => setNewDevice(e.target.value)}
                            >
                                {allDevices.map((device) => (
                                    <MenuItem
                                        key={device.id}
                                        value={device.id}
                                        disabled={devices.find(d => d.id === device.id) !== undefined}
                                    >
                                        {device.name} ( {device.id} )
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={e => setOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleBindDevice}>Add</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}