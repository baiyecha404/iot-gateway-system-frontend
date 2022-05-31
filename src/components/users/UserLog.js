import React, { useState, useEffect } from 'react';
import {
    Divider, Typography, Box, Table, TableBody, TableRow, TableCell, TableContainer, Chip, TablePagination
} from '@mui/material';
import UserService from '../../api/User';

export default function UserLog(props) {
    const { userId } = props;
    const [logs, setLogs] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);


    useEffect(() => {
        UserService.getUserLogs(userId).then(resp => {
            if (resp.result) {
                setLogs(resp.result);
            }
        })
        return () => setLogs([]);
    }, [])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const parseSeverity = (severity) => {
        switch (severity) {
            case "normal":
                return "success";
            case "warning":
                return "warning"
            case "danger":
                return "error"
            default:
                break
        }
    }


    return (
        <React.Fragment>
            <Box>
                <Typography variant="h6">用户日志</Typography>
            </Box>
            <Box sx={{ my: 3 }}>
                <TableContainer style={{ maxHeight: 350 }}>
                    <Table aria-label="simple table">
                        <TableBody>
                            {logs
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(log => (
                                    <TableRow
                                        key={log.id}
                                        sx={{ borderBottom: 1 }}
                                    >
                                        <TableCell>
                                            {log.path}
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={<Typography variant="body2" fontWeight="bold">{log.severity}</Typography>}
                                                color={parseSeverity(log.severity)}
                                            />
                                        </TableCell>
                                        <TableCell>{log.action}</TableCell>
                                        <TableCell align="right">{log.time}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                    <Divider />
                    <TablePagination
                        rowsPerPageOptions={[10, 15, 20, 25, 30]}
                        component="div"
                        count={logs.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            </Box>
        </React.Fragment>
    )
}