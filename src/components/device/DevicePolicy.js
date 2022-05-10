import React, { useEffect, useState, useContext } from "react";
import { MessageContext } from '../DashBoard';
import { useNavigate } from "react-router-dom";
import {
    Table, TableHead, TableBody, TableRow, TableCell, Divider, Chip, Box, Button, Stack, Link,
    Typography
} from "@mui/material";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import AddDevicePolicy from './AddDevicePolicy';
import DeviceService from "../../api/Device";
import PolicyService from "../../api/Policy";
import Utils from "../../utils/Utils";


export default function DevicePolicy(props) {
    const { setSuccess, setError } = useContext(MessageContext);
    const { deviceId } = props;
    const [policies, setPolicies] = useState([]);
    const [shouldUpdate, setShouldUpdate] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const navigate = useNavigate();

    
    useEffect(() => {
        if (shouldUpdate) {
            DeviceService.getDevicePolicies(deviceId).then(resp => {
                if (resp.result) {
                    setPolicies(resp.result)
                }
            }).then(() => {
                setShouldUpdate(false)
            })
        }
        return () => {
            setShouldUpdate(false);
        }
    }, [shouldUpdate])

    const handleButtonClick = (event) => {
        setDialogOpen(true);
    }

    const handleDelete = (subject, action) => {
        PolicyService.removeDevicePolicy(subject, deviceId, action).then(resp => {
            if (resp.result) {
                setSuccess(resp.result)
            }
            if (resp.error) {
                setError(resp.error)
            }
        }).then(() => {
            setShouldUpdate(true)
        })
    };

    return (
        <React.Fragment>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Subject
                        </TableCell>
                        <TableCell>
                            Subject Name
                        </TableCell>
                        <TableCell >
                            Relations
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.keys(Utils.groupBy(policies, "subject"))
                        .map(subject => (
                            <TableRow key={subject}>
                                <TableCell>
                                    <Link underline="always" onClick={(e) => navigate(`/users/${subject}/info`, { replace: true })}>
                                        <Typography fontWeight="bold" variant="body2">
                                        {subject}
                                        </Typography>
                                    </Link>
                                </TableCell>
                                <TableCell>
                                {Utils.groupBy(policies, "subject")[subject][0]["subject_name"]}
                                </TableCell>
                                <TableCell align="right">
                                    <Stack direction="row" spacing={1}>
                                        {Utils.groupBy(policies, "subject")[subject]
                                            .map(policy => policy.relation)
                                            .map(relation => (
                                                <Chip
                                                    key={`${subject}-${relation}`}
                                                    label={relation}
                                                    onDelete={e => handleDelete(subject, relation)}
                                                    deleteIcon={<CancelOutlinedIcon />}
                                                />
                                            ))}
                                    </Stack>
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
                    添加新策略
                </Button>
            </Box>
            {dialogOpen &&
                <AddDevicePolicy
                    deviceId={deviceId}
                    open={dialogOpen}
                    setOpen={setDialogOpen}
                    setUpdate={setShouldUpdate}
                />}
        </React.Fragment>
    )
}