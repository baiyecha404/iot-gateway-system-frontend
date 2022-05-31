import React, { useEffect, useState } from "react";
import {
    Table, TableHead, TableCell, TableRow, TableBody, Card, CardHeader, Box
} from "@mui/material";
import AuthService from "../../api/Auth";
import UserService from "../../api/User";


export default function LastLogin() {

    const [infos, setInfos] = useState([]);

    useEffect(() => {
        UserService.getLoginHistory(AuthService.getCurrentUser()).then(resp => {
            if (resp.result) {
                setInfos(resp.result)
            }
        });
        return () => setInfos([]);
    }, []);

    return (
        <React.Fragment>
            <Card>
                <CardHeader title="登录历史" />
                <Box sx={{ minWidth: 800 }}>
                    <Table aria-label="login table">
                        <TableHead>
                            <TableRow>
                                <TableCell>User Id</TableCell>
                                <TableCell>Username</TableCell>
                                <TableCell>Ip Address</TableCell>
                                <TableCell>Last Login</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {infos.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.user_id}</TableCell>
                                    <TableCell>{row.username}</TableCell>
                                    <TableCell>{row.ip_address}</TableCell>
                                    <TableCell >{row.last_login}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </Card>
        </React.Fragment>
    );
}