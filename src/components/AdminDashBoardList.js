import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ListItemButton, ListItemIcon, ListItemText, Collapse, List, Divider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import PersonIcon from '@mui/icons-material/Person';
import DevicesIcon from '@mui/icons-material/Devices';
import LooksIcon from '@mui/icons-material/Looks';
import GroupsIcon from '@mui/icons-material/Groups';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';

export default function AdminListItems(props) {

    const { page, status, changeOpen } = props;
    const homeEl = useRef(null);
    const accountEl = useRef(null);
    const settingsEl = useRef(null);
    const manageEl = useRef(null);
    const devicesEl = useRef(null);
    const usersEl = useRef(null);
    const channelEl = useRef(null);
    const monitorEl = useRef(null);
    const elderEl = useRef(null);
    const groupEl = useRef(null)
    const [openDeviceList, setOpenDeviceList] = useState(false);
    const [openServiceList, setOpenServiceList] = useState(false);
    const navigate = useNavigate();

    const handlePageClick = (event) => {
        if (status) {
            if (homeEl.current && homeEl.current.contains(event.target)) {
                if (page !== "home") {
                    navigate('/', { replace: true })
                }
            } else if (accountEl.current && accountEl.current.contains(event.target)) {
                // goto account page
                if (page !== "account") {
                    navigate('/account', { replace: true })
                }
            } else if (settingsEl.current && settingsEl.current.contains(event.target)) {
                // goto settings page
                if (page !== "settings") {
                    navigate('/settings', { replace: true })
                }
            } else if (usersEl.current && usersEl.current.contains(event.target)) {
                // goto users page
                if (page !== "users") {
                    navigate('/users', { replace: true })
                }
            } else if (manageEl.current && manageEl.current.contains(event.target)) {
                if (page !== "manage") {
                    navigate('/manage', { replace: true })
                }
            } else if (channelEl.current && channelEl.current.contains(event.target)) {
                if (page !== "channels") {
                    navigate('/channels', { replace: true })
                }
            } else if (devicesEl.current && devicesEl.current.contains(event.target)) {
                if (page !== "devices") {
                    navigate('/devices', { replace: true })
                }
            } else if (monitorEl.current && monitorEl.current.contains(event.target)) {
                if (page !== "monitors") {
                    navigate('/monitors', { replace: true })
                }
            } else if (elderEl.current && elderEl.current.contains(event.target)) {
                if (page !== "elder-caring") {
                    navigate('/elder-caring', { replace: true })
                }
            } else if (groupEl.current && groupEl.current.contains(event.target)) {
                if (page !== "groups") {
                    navigate('/groups', { replace: true })
                }
            }
        } else {
            changeOpen(true);
        }
    }

    const handleDeviceListClick = () => {
        changeOpen(true);
        if (status) {
            setOpenDeviceList(!openDeviceList);
        }
    }

    const handleServiceListClick = () => {
        changeOpen(true);
        if (status) {
            setOpenServiceList(!openServiceList);
        }
    }

    return (
        <React.Fragment>
            <ListItemButton ref={homeEl} onClick={handlePageClick}>
                <ListItemIcon>
                    <HomeIcon sx={{ fontSize: 30 }} />
                </ListItemIcon>
                <ListItemText primary="Home" />
            </ListItemButton>
            <Divider />
            <ListItemButton ref={accountEl} onClick={handlePageClick}>
                <ListItemIcon>
                    <AccountBoxIcon sx={{ fontSize: 30 }} />
                </ListItemIcon>
                <ListItemText primary="Account" />
            </ListItemButton>
            <Divider />
            <ListItemButton ref={settingsEl} onClick={handlePageClick}>
                <ListItemIcon>
                    <SettingsIcon sx={{ fontSize: 30 }} />
                </ListItemIcon>
                <ListItemText primary="Settings" />
            </ListItemButton>
            <Divider />
            <ListItemButton ref={groupEl} onClick={handlePageClick}>
                <ListItemIcon>
                    <GroupsIcon sx={{ fontSize: 30 }} />
                </ListItemIcon>
                <ListItemText primary="Groups" />
            </ListItemButton>
            <Divider />
            <ListItemButton ref={usersEl} onClick={handlePageClick}>
                <ListItemIcon>
                    <PersonIcon sx={{ fontSize: 30 }} />
                </ListItemIcon>
                <ListItemText primary="Users" />
            </ListItemButton>
            <Divider />
            <ListItemButton onClick={handleDeviceListClick}>
                <ListItemIcon>
                    <DeviceHubIcon sx={{ fontSize: 30 }} />
                </ListItemIcon>
                <ListItemText primary="Device" />
                {openDeviceList ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={status && openDeviceList} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton ref={devicesEl} sx={{ pl: 4 }} onClick={handlePageClick}>
                        <ListItemIcon>
                            <DevicesIcon sx={{ fontSize: 20 }} />
                        </ListItemIcon>
                        <ListItemText primary="Devices" />
                    </ListItemButton>
                    <ListItemButton ref={channelEl} sx={{ pl: 4 }} onClick={handlePageClick}>
                        <ListItemIcon>
                            <LooksIcon sx={{ fontSize: 20 }} />
                        </ListItemIcon>
                        <ListItemText primary="Channels" />
                    </ListItemButton>
                    <ListItemButton ref={manageEl} sx={{ pl: 4 }} onClick={handlePageClick}>
                        <ListItemIcon>
                            <DevicesOtherIcon sx={{ fontSize: 20 }} />
                        </ListItemIcon>
                        <ListItemText primary="Manage" />
                    </ListItemButton>
                </List>
            </Collapse>
            <Divider />
            <ListItemButton onClick={handleServiceListClick}>
                <ListItemIcon>
                    <AutoAwesomeMotionIcon sx={{ fontSize: 30 }} />
                </ListItemIcon>
                <ListItemText primary="Service" />
                {openServiceList ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={status && openServiceList} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton ref={elderEl} sx={{ pl: 4 }} onClick={handlePageClick}>
                        <ListItemIcon>
                            <DevicesIcon sx={{ fontSize: 20 }} />
                        </ListItemIcon>
                        <ListItemText primary="Elder Caring" />
                    </ListItemButton>
                    <ListItemButton ref={monitorEl} sx={{ pl: 4 }} onClick={handlePageClick}>
                        <ListItemIcon>
                            <LooksIcon sx={{ fontSize: 20 }} />
                        </ListItemIcon>
                        <ListItemText primary="Monitor" />
                    </ListItemButton>
                </List>
            </Collapse>
            <Divider />
        </React.Fragment>
    )
}
