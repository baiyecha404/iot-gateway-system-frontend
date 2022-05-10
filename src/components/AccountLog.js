import React, { useState } from "react";
import {
    Box, Table, TableBody, TableCell, TableRow, Card, CardHeader, CardContent, Typography, TableContainer,
    Chip, Divider, TablePagination
} from "@mui/material";

export default function AccountLogs(props) {
    const { logs } = props;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);


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
            <Box sx={{ my: 3 }}>
                <Card>
                    <CardHeader
                        title={<Typography variant="h6">用户日志</Typography>}
                        sx={{
                            height: 50,
                            backgroundColor: (theme) => theme.palette.grey[200]
                        }}
                    />
                    <CardContent>
                        <TableContainer style={{ maxHeight: 450 }}>
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
                                            <TableCell>{log.time}</TableCell>
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
                    </CardContent>
                </Card>
            </Box>
        </React.Fragment>
    )


}