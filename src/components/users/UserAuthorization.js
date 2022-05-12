import React, { useEffect, useState, useContext } from "react";
import { MessageContext } from '../DashBoard';
import { useNavigate } from "react-router-dom";
import {
    Table, TableHead, TableBody, TableRow, TableCell, Divider, Chip, Box, Button, Stack, Link,
    Typography
} from "@mui/material";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import UserService from "../../api/User";
import PolicyService from "../../api/Policy";


export default function UserAuthorization(props) {
    const { setSuccess, setError } = useContext(MessageContext);
    const { userId } = props;
    const [policies, setPolicies] = useState([]);
    const [shouldUpdate, setShouldUpdate] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        if (shouldUpdate) {
            UserService.getUserPolicies(userId).then(resp => {
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


    const handleDelete = (group_id, user_id) => {
        PolicyService.removeGroupMember(group_id, user_id).then(resp => {
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
                            Id
                        </TableCell>
                        <TableCell>
                            Name
                        </TableCell>
                        <TableCell >
                            Relations
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {policies.map(policy => (
                        <TableRow key={policy.user.user_id}>
                            <TableCell>
                                <Link underline="always" onClick={(e) => navigate(`/users/${policy.user.user_id}/info`, { replace: true })}>
                                    <Typography variant="body2" fontWeight="bold">
                                        {policy.user.user_id}
                                    </Typography>
                                </Link>

                            </TableCell>
                            <TableCell>
                                {policy.user.username}
                            </TableCell>
                            <TableCell >
                                <Stack direction="row" spacing={1}>
                                    {policy.relation
                                        .map(relation => (
                                            <Chip
                                                key={`${policy.user.user_id}-${relation}`}
                                                label={relation}
                                                onDelete={e => handleDelete(relation, relation)}
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
        </React.Fragment>
    )
}