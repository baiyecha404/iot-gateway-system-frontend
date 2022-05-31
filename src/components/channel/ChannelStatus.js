import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import ChannelService from '../../api/Channel';
import ChannelMapStatus from './ChannelMapStatus';
import ChannelChartStatus from './ChannelChartStatus';

export default function ChannelStatus(props) {
    const { channelId } = props;
    const [messages, setMessages] = useState([]);

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

    useEffect(() => {
        ChannelService.getMessages(channelId).then(resp => {
            if (resp.result) {
                setMessages(resp.result)
            }
        })
        return () => setMessages([]);
    }, [channelId])

    const groupByName = (messages) => {
        const grouped = [];
        messages.forEach(message => {
            let data = JSON.parse(message.data);
            let name = data.name;
            if (!grouped[name]) {
                grouped[name] = []
            }

            grouped[name].push({ ...data, created_at: message.created_at });
        })
        return grouped;
    }

    let deviceMessages = messages
        .filter(message => uuidRegex.test(message.sender))
        .sort((x, y) => new Date(x.created_at) - new Date(y.created_at))


    if (deviceMessages.length > 10) {
        deviceMessages = deviceMessages.slice(deviceMessages.length - 10, deviceMessages.length)
    }

    const groupedMessages = groupByName(deviceMessages);


    return (
        <React.Fragment>
                {Object.keys(groupedMessages).map((name) => (
                    <Box key={name} sx={{ my: 3 }}>
                        {name === "geolation" ?
                            <ChannelMapStatus messages={groupedMessages[name]} />
                            : <ChannelChartStatus
                                dataName={name}
                                messages={groupedMessages[name]} />}

                    </Box>
                ))}
        </React.Fragment>
    )
}