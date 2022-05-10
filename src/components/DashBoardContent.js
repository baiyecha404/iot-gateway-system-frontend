import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import NotFound from "./NotFound";
import Home from './home/Home';
import DeviceMenu from './device/DeviceMenu';
import Account from './Account';
import Settings from './Settings';
import AddNewDevice from "./device/AddDevice";
import DeviceList from "./device/DeviceList";
import DeviceDetail from "./device/DeviceDetail";
import AddNewChannel from './channel/AddChannel';
import ChannelList from './channel/ChannelList';
import ChannelDetail from './channel/ChannelDetail';
import Users from "./users/UserList";
import UserDetail from "./users/UserDetail";
import GroupList from "./group/GroupList";
import GroupDetail from "./group/GroupDetail";
import ElderCaring from "./services/ElderCaring";
import MonitorList from "./services/MonitorList";
import MonitorDetail from "./services/monitors/MonitorDetail";
import ElderDetail from "./services/elder/ElderDetail";


export default function DashBoardContent(props) {
    const { page, setPage, isAdmin } = props;
    const { deviceId, channelId, userId, monitorId, elderId, groupId } = useParams();
    const location = useLocation();
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

    useEffect(() => {
        if (deviceId && uuidRegex.test(deviceId)) {
            setPage("device-detail");
        } else if (channelId && uuidRegex.test(channelId)) {
            setPage("channel-detail");
        } else if (userId && uuidRegex.test(userId)) {
            setPage("user-detail");
        } else if (groupId && uuidRegex.test(groupId)) {
            setPage("group-detail");
        } else if (monitorId) {
            setPage("monitor-detail")
        } else if (elderId && uuidRegex.test(elderId)) {
            setPage("elder-detail")
        } else {
            setPage(location.pathname.substring(1).replace(/\//g, "-"));
        }
    }, [location.pathname]);

    function renderByPage(page) {
        switch (page) {
            case "":
                return (isAdmin ? <Home /> : <Account isAdmin={isAdmin} />)
            case "home":
                return (isAdmin ? <Home /> : <NotFound />)
            case "account":
                return <Account isAdmin={isAdmin} />
            case "settings":
                return <Settings />
            case "devices":
                return <DeviceList />
            case "manage":
                return <DeviceMenu />
            case "devices-new":
                return <AddNewDevice />
            case "device-detail":
                return <DeviceDetail deviceId={deviceId} />
            case "channels":
                return <ChannelList />
            case "channels-new":
                return <AddNewChannel />
            case "channel-detail":
                return <ChannelDetail channelId={channelId} />
            case "users":
                return (isAdmin ? <Users /> : <NotFound />)
            case "user-detail":
                return <UserDetail userId={userId} />
            case "groups":
                return (isAdmin ? <GroupList /> : <NotFound />)
            case "group-detail":
                return <GroupDetail groupId={groupId} />
            case "elder-caring":
                return <ElderCaring />
            case "elder-detail":
                return <ElderDetail elderId={elderId} />
            case "monitors":
                return (isAdmin ? <MonitorList /> : <NotFound />)
            case "monitor-detail":
                return <MonitorDetail monitorId={monitorId} />
            default:
                break;
        }
    }

    return (
        <React.Fragment>
            {renderByPage(page)}
        </React.Fragment>
    )
}