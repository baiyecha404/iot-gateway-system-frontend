import React, { useEffect, useState } from "react";
import {
    Table, TableHead, TableCell, TableRow, TableBody, Card,
    CardHeader, Box
} from "@mui/material";
import AuthService from "../../api/Auth";
import UserService from "../../api/User";


const infos = [{"id":5,"user_id":"e46aae5a-e5ba-45f8-a927-d68298447396","username":"admin","ip_address":"127.0.0.1","last_login":"2022-03-25 14:35:25"},{"id":4,"user_id":"e46aae5a-e5ba-45f8-a927-d68298447396","username":"admin","ip_address":"127.0.0.1","last_login":"2022-03-25 14:27:32"},{"id":3,"user_id":"e46aae5a-e5ba-45f8-a927-d68298447396","username":"admin","ip_address":"127.0.0.1","last_login":"2022-03-25 01:10:19"},{"id":2,"user_id":"e46aae5a-e5ba-45f8-a927-d68298447396","username":"admin","ip_address":"127.0.0.1","last_login":"2022-03-24 06:23:27"},{"id":1,"user_id":"e46aae5a-e5ba-45f8-a927-d68298447396","username":"admin","ip_address":"127.0.0.1","last_login":"2022-03-23 10:46:20"}]


export default function Orders() {

    /*const [infos, setInfos] = useState([]);

    useEffect(() => {
        UserService.getLoginHistory(AuthService.getCurrentUser()).then(resp => {
            if (resp.result) {
                setInfos(resp.result)
                console.log(JSON.stringify(infos))
            }
        });
    }, []);*/

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