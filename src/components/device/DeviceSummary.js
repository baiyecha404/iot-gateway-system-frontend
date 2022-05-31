import React, { useEffect } from "react";
import { Typography, List, ListItem, ListItemText } from "@mui/material";

export default function DeviceSummary(props) {
    const { info, setInfo } = props;

    const buildConnectUri = (info) => {
        let uri = "";
        let auth = "";
        if (info.username || info.password) {
            auth = `${info.username}:${info.password}@`;
        }
        if (info.connector.includes("http")) {
            uri = `http://${auth}${info.host}:${info.port}/`;
        } else if (info.connector.includes("mqtt")) {
            uri = `amqp://${auth}${info.host}:${info.port}/`;
        } else if (info.connector.includes("ftp")) {
            uri = `ftp://${auth}${info.host}:${info.port}/`;
        } else if (info.connector.includes("websocket")) {
            uri = `http://${auth}${info.host}:${info.port}/`;
        }
        return uri;
    }

    useEffect(() => {
        setInfo({ ...info, connect_uri: buildConnectUri(info) });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                设备细节
            </Typography>
            <List disablePadding>
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Device Name" />
                    <Typography variant="body2">{info.deviceName}</Typography>
                </ListItem>
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Device Label" />
                    <Typography variant="body2">{info.label}</Typography>
                </ListItem>
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Device Connection Uri" />
                    <Typography variant="body2">{info.connect_uri}</Typography>
                </ListItem>
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Device Location" />
                    <Typography variant="body2">{info.location}</Typography>
                </ListItem>
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Device Connector" />
                    <Typography variant="body2">{info.connector}</Typography>
                </ListItem>
            </List>
        </React.Fragment>
    )
}