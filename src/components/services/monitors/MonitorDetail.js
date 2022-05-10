import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Container, Card, CardHeader, CardContent, Divider, Tab
} from "@mui/material";
import { TabList, TabContext, TabPanel } from "@mui/lab";
import DoorMonitor from "./DoorMonitor";
import LivingRoomMonitor from "./LivingRoom"; 
import BedRoomMonitor from "./BedRoomMonitor";

export default function Monitor(props) {
    const { monitorId } = props;
    const { tab } = useParams();
    const [currentTab, setCurrentTab] = useState("door");
    const navigate = useNavigate()

    useEffect(() => {
        const tabs = ["", "door", "livingroom", "bedroom"];
        if (tab && tabs.includes(tab)) {
            setCurrentTab(tab);
        }
    }, [tab])

    const handleChange = (event, newValue) => {
        navigate(`/monitors/${monitorId}/${newValue}`, { replace: true });
    };


    return (
        <React.Fragment>
            <Container maxWidth="bg">
                <Card>
                    <CardHeader
                        title="家庭监控"
                        sx={{
                            height: 40,
                            backgroundColor: (theme) => theme.palette.grey[200]
                        }}
                    />
                    <Divider />
                    <CardContent >
                        <TabContext value={currentTab}>
                            <TabList
                                onChange={handleChange}
                                textColor="primary"
                                indicatorColor="primary"
                                aria-label="secondary tabs example"
                            >
                                <Tab label="家门" value="door" />
                                <Tab label="客厅" value="livingroom" />
                                <Tab label="卧室" value="bedroom" />
                            </TabList>
                            <TabPanel value="door">
                                <DoorMonitor />
                            </TabPanel>
                            <TabPanel value="livingroom">
                                <LivingRoomMonitor />
                            </TabPanel>
                            <TabPanel value="bedroom">
                                <BedRoomMonitor />
                            </TabPanel>
                        </TabContext>
                    </CardContent>
                </Card>
            </Container>
        </React.Fragment>
    )
}