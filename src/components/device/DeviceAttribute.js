import React, { useState, useEffect, useContext } from "react";
import { MessageContext } from "../DashBoard";
import {
    Table, TableHead, TableCell, TableRow, TableBody, Divider, Button, Box, Dialog, DialogTitle,
    DialogContent, DialogContentText, DialogActions, Grid, TextField, Link, Chip
} from "@mui/material";
import DeviceService from "../../api/Device";


export default function DeviceAttribute(props) {

    const { deviceId } = props;
    const { setSuccess, setError } = useContext(MessageContext);
    const [attributes, setAttributes] = useState([]);
    const [shouldUpdate, setShouldUpdate] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const originalAttribute = {
        id: "",
        name: "",
        identifier: "",
        type: "",
        definition: "",
        maxValue: "",
        minValue: "",
    }
    const [newAttribute, setNewAttribute] = useState(originalAttribute);


    useEffect(() => {
        if (shouldUpdate) {
            DeviceService.getDeviceAttributes(deviceId).then(resp => {
                if (resp.result) {
                    setAttributes(resp.result);
                }
            }).then(() => {
                setShouldUpdate(false);
            })
        }
    }, [deviceId, shouldUpdate])


    const handleEditClick = (attribute) => {
        setNewAttribute(attribute)
        setIsEdit(true);
        setDialogOpen(true);
    }

    const handleButtonClick = (event) => {
        setNewAttribute(originalAttribute)
        setIsEdit(false);
        setDialogOpen(true);
    }


    const addNewAttribute = (event) => {
        setDialogOpen(false);
        DeviceService.addDeviceAttribute(deviceId, newAttribute).then(resp => {
            if (resp.result) {
                setSuccess(resp.result);
            }
            if (resp.err) {
                setError(resp.err);
            }
        }).then(() => {
            setShouldUpdate(true);
        })
    }

    const updateAttribute = (event) => {
        setDialogOpen(false);
        DeviceService.updateDeviceAttribute(deviceId, newAttribute).then(resp => {
            if (resp.result) {
                setSuccess(resp.result);
            }
            if (resp.err) {
                setError(resp.err);
            }
        }).then(() => {
            setShouldUpdate(true);
        })
    }

    const deleteAttribute = (id) => {
        DeviceService.deleteDeviceAttribute(deviceId, id).then(resp => {
            if (resp.result) {
                setSuccess(resp.result);
            }
            if (resp.err) {
                setError(resp.err);
            }
        }).then(() => {
            setShouldUpdate(true);
        })
    }


    return (
        <React.Fragment>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Name
                        </TableCell>
                        <TableCell>
                            Identifier
                        </TableCell>
                        <TableCell>
                            Data Type
                        </TableCell>
                        <TableCell>
                            Data Range
                        </TableCell>
                        <TableCell>
                            Data Definition
                        </TableCell>
                        <TableCell>
                            Action
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {attributes.map(attribute => (
                        <TableRow key={attribute.id}>
                            <TableCell>
                                {attribute.name}
                            </TableCell>
                            <TableCell>
                                {attribute.identifier}
                            </TableCell>
                            <TableCell>
                                {attribute.type}
                            </TableCell>
                            <TableCell>
                                {attribute.minValue !== "" || attribute.maxValue !== "" ? 
                                `${attribute.minValue} ~ ${attribute.maxValue}` : 'None'}
                            </TableCell>
                            <TableCell>
                                <Chip label={attribute.definition} color="primary" variant="outlined" />
                            </TableCell>
                            <TableCell>
                                <Grid container spacing={2}>
                                    <Grid item>
                                        <Link onClick={e => handleEditClick(attribute)} underline="always">
                                            Edit
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link onClick={e => deleteAttribute(attribute.id)} underline="always">
                                            Delete
                                        </Link>
                                    </Grid>
                                </Grid>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Divider />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    p: 2
                }}
            >
                <Button
                    color="primary"
                    variant="contained"
                    onClick={handleButtonClick}
                >
                    添加新属性
                </Button>
            </Box>
            <Dialog open={dialogOpen} onClose={e => setDialogOpen(false)}
                fullWidth
                maxWidth={'sm'}>
                <DialogTitle>Add Attributes</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        请配置你要添加的属性
                    </DialogContentText>
                    <Grid container wrap="wrap" spacing={4}>
                        <Grid xs={12} item>
                            <TextField
                                id="name"
                                margin="dense"
                                label="Name"
                                fullWidth
                                variant="outlined"
                                value={newAttribute.name}
                                onChange={e => setNewAttribute({ ...newAttribute, name: e.target.value })}
                            />
                            <TextField
                                id="identifier"
                                margin="dense"
                                label="Identifier"
                                fullWidth
                                variant="outlined"
                                value={newAttribute.identifier}
                                onChange={e => setNewAttribute({ ...newAttribute, identifier: e.target.value })}
                            />
                            <TextField
                                id="type"
                                margin="dense"
                                label="Type"
                                fullWidth
                                variant="outlined"
                                value={newAttribute.type}
                                onChange={e => setNewAttribute({ ...newAttribute, type: e.target.value })}
                            />
                            <TextField
                                id="min-value"
                                margin="dense"
                                label="Min Value"
                                fullWidth
                                variant="outlined"
                                value={newAttribute.minValue}
                                onChange={e => setNewAttribute({ ...newAttribute, minValue: e.target.value })}
                                placeholder="Optional Min Value"
                            />
                            <TextField
                                id="max-value"
                                margin="dense"
                                label="Max Value"
                                fullWidth
                                variant="outlined"
                                value={newAttribute.maxValue}
                                onChange={e => setNewAttribute({ ...newAttribute, maxValue: e.target.value })}
                                placeholder="Optional Max Value"
                            />
                            <TextField
                                id="definition"
                                margin="dense"
                                label="Definition"
                                fullWidth
                                variant="outlined"
                                value={newAttribute.definition}
                                onChange={e => setNewAttribute({ ...newAttribute, definition: e.target.value })}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={e => setDialogOpen(false)}>Cancel</Button>
                    {isEdit ? <Button variant="contained" onClick={updateAttribute}>Update</Button>
                        : <Button variant="contained" onClick={addNewAttribute}>Add</Button>}
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}