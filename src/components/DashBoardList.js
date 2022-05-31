import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ListItemButton, ListItemIcon, ListItemText, Divider, Collapse, List } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DevicesIcon from '@mui/icons-material/Devices';
import LooksIcon from '@mui/icons-material/Looks';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import AccessibleIcon from '@mui/icons-material/Accessible';

export default function ListItems(props) {

    const { page, status, changeOpen } = props;
    const accountEl = useRef(null);
    const manageEl = useRef(null);
    const settingsEl = useRef(null);
    const devicesEl = useRef(null);
    const channelsEl = useRef(null);
    const elderEl = useRef(null);
    const [openDeviceList, setOpenDeviceList] = useState(false);
    const navigate = useNavigate();

    const handlePageClick = (event) => {
        if (status) {
            if (accountEl.current && accountEl.current.contains(event.target)) {
                // goto account page
                if (page !== "account") {
                    navigate('/account', { replace: true })
                }
            } else if (manageEl.current && manageEl.current.contains(event.target)) {
                if (page !== "manage") {
                    navigate('/manage', { replace: true })
                }
            } else if (settingsEl.current && settingsEl.current.contains(event.target)) {
                // goto settings page
                if (page !== "settings") {
                    navigate('/settings', { replace: true })
                }
            } else if (devicesEl.current && devicesEl.current.contains(event.target)) {
                if (page !== "devices") {
                    navigate('/devices', { replace: true })
                }
            } else if (channelsEl.current && channelsEl.current.contains(event.target)) {
                if (page !== "channels") {
                    navigate('/channels', { replace: true })
                }
            } else if (elderEl.current && elderEl.current.contains(event.target)) {
                if (page !== "elder-caring") {
                    navigate('/elder-caring', { replace: true })
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


    return (
        <React.Fragment>
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
                    <ListItemButton ref={channelsEl} sx={{ pl: 4 }} onClick={handlePageClick}>
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
            <ListItemButton ref={elderEl} onClick={handlePageClick}>
                <ListItemIcon>
                    <AccessibleIcon sx={{ fontSize: 30 }} />
                </ListItemIcon>
                <ListItemText primary="Elder Caring" />
            </ListItemButton>
            <Divider />
        </React.Fragment>
    )
}
