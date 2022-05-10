import React, { useEffect, useState, useMemo, createContext } from 'react';
import { useNavigate } from "react-router-dom";
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import {
    Box, CssBaseline, IconButton, Toolbar, Typography, Badge, Divider, List,
    Tooltip, Menu, MenuItem, Container, Grid, Snackbar, Alert
} from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import CloudIcon from '@mui/icons-material/Cloud';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ListItems from './DashBoardList';
import AdminListItems from './AdminDashBoardList';
import DashBoardContent from "./DashBoardContent";
import AuthService from "../api/Auth";
import ThemeOptions from './Theme';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const theme = createTheme(ThemeOptions)

export const MessageContext = createContext();

const MessageContextProvider = ({ children }) => {
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleMessageClose = (event) => {
        setSuccess("");
        setError("");
    }

    const ctxValue = useMemo(() => ({
        success,
        error,
        setSuccess,
        setError
    }), [success, error]);

    return (
        <MessageContext.Provider value={ctxValue}>
            {children}
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={success.length > 0} autoHideDuration={1500} onClose={handleMessageClose}>
                <Alert elevation={4} variant="filled" onClose={handleMessageClose} severity="success" sx={{ width: '100%' }}>
                    {success}
                </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={error.length > 0} autoHideDuration={1500} onClose={handleMessageClose}>
                <Alert elevation={4} variant="filled" onClose={handleMessageClose} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </MessageContext.Provider>
    )
}


export default function DashBoard() {

    const navigate = useNavigate();

    const [page, setPage] = useState("home");
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [open, setOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = (event) => {
        setAnchorElUser(null);
    }

    const handleSettingsPage = (event) => {
        navigate('/settings');
        setAnchorElUser(null);
    }

    const handleAccountPage = (event) => {
        navigate('/account');
        setAnchorElUser(null);
    }

    const handleLogOut = (event) => {
        AuthService.logout();
        setAnchorElUser(null);
        navigate('/login');
    }


    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (!user) {
            navigate('/login');
        }
        const isadmin = AuthService.checkAdmin()
        setIsAdmin(isadmin)
    }, [navigate])


    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px',
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            <Grid container direction="row" spacing={3}>
                                <Grid item>
                                    <CloudIcon />
                                </Grid>
                                <Grid item>
                                    IOT网关管理后台
                                </Grid>
                            </Grid>
                        </Typography>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} color="inherit">
                                    <Badge color="secondary">
                                        <AccountCircle />
                                    </Badge>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={handleSettingsPage}>
                                    <Typography textAlign="center">设置</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleAccountPage}>
                                    <Typography textAlign="center">账户</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleLogOut}>
                                    <Typography textAlign="center">登出</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        {isAdmin === true ? (<AdminListItems
                            status={open}
                            changeOpen={setOpen}
                            page={page}
                        />) : (<ListItems
                            status={open}
                            changeOpen={setOpen}
                            page={page}
                        />)}
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <MessageContextProvider>
                            <DashBoardContent
                                isAdmin={isAdmin}
                                page={page}
                                setPage={setPage}
                            />
                        </MessageContextProvider>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    )
}