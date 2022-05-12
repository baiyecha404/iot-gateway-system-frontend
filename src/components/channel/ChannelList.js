import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Checkbox, Card, Box, Container, CardHeader, Table, TableHead, TableCell, Link, Chip,
    TableRow, TableBody, TextField, InputAdornment, TablePagination, Divider, Button, Tooltip,
    Typography
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import ChannelService from '../../api/Channel';
import Utils from '../../utils/Utils';


export default function ChannelList(props) {

    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const [channels, setChannels] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        ChannelService.getChannels().then(resp => {
            if (resp.result) {
                setChannels(resp.result);
            }
        });
        return () => setChannels([])
    }, [])


    const handleSelectAll = (event) => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(channels.map(li => li.id));
        if (isCheckAll) {
            setIsCheck([]);
        }
    };

    const handleClick = (event) => {
        const { id, checked } = event.target
        setIsCheck([...isCheck, id]);
        if (!checked) {
            setIsCheck(isCheck.filter(item => item !== id));
        }
    }


    const handleSearch = (event) => {
        ChannelService.searchChannel(event.target.value).then(resp => {
            if (resp.result) {
                setChannels(resp.result);
            }
        })
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const handleExport = (event) => {
        event.preventDefault();
        Utils.downloadFile({
            data: JSON.stringify(channels),
            fileName: 'channels.export.json',
            fileType: 'text/json',
        })
    }

    return (
        <React.Fragment>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="bg">
                    <Card>
                        <CardHeader
                            title="信道实例列表"
                            action={
                                <React.Fragment>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            p: 1,
                                            flexWrap: 'wrap',
                                        }}
                                    >
                                        <TextField
                                            id="outlined-search" label="Search for channel" type="search"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <SearchIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            onChange={handleSearch}
                                        />

                                        <Box sx={{ m: 1 }}>
                                            <Button
                                                color="primary"
                                                variant="outlined"
                                                sx={{ ml: 4, mr: 1 }}
                                                onClick={e => navigate('new')}
                                            >
                                                添加信道
                                            </Button>
                                            <Tooltip title="export channels">
                                                <Button
                                                    startIcon={(<DownloadIcon fontSize="small" />)}
                                                    color="primary"
                                                    variant="contained"
                                                    sx={{ mr: 1 }}
                                                    onClick={handleExport}
                                                >
                                                    导出
                                                </Button>
                                            </Tooltip>
                                        </Box>

                                    </Box>
                                </React.Fragment>
                            }
                        />
                        <Box sx={{ minWidth: 800 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <Checkbox
                                                size="small"
                                                onChange={handleSelectAll}
                                                checked={isCheckAll}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            Channel Id
                                        </TableCell>
                                        <TableCell>
                                            Name
                                        </TableCell>
                                        <TableCell sortDirection="desc">
                                            Owner
                                        </TableCell>
                                        <TableCell>
                                            Connections
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {channels
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((channel) => (
                                            <TableRow
                                                hover
                                                key={channel.id}
                                                selected={isCheck.includes(channel.id)}
                                            >
                                                <TableCell>
                                                    <Checkbox
                                                        id={channel.id}
                                                        size="small"
                                                        onChange={handleClick}
                                                        checked={isCheck.includes(channel.id)}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Link onClick={(e) => navigate(`/channels/${channel.id}/info`, { replace: true })} underline="always">
                                                        <Typography fontWeight="bold" variant="body2">
                                                            {channel.id}
                                                        </Typography>


                                                    </Link>
                                                </TableCell>
                                                <TableCell>
                                                    <Chip label={channel.name} />
                                                </TableCell>
                                                <TableCell>
                                                    {channel.owner}
                                                </TableCell>
                                                <TableCell>
                                                    {channel.connections}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                            <Divider />
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={channels.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Box>
                    </Card>
                </Container>
            </Box>
        </React.Fragment>
    )
}