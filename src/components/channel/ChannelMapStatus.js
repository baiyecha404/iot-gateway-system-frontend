import React, { useEffect } from "react";
import { Box, Skeleton } from "@mui/material";
import { Map, Markers, InfoWindow } from 'react-amap';

export default function ChannelMapStatus(props) {
    const { messages } = props;
    let markersPosition = []
    let infoWindowPosition = {}

    const YOUR_AMAP_KEY = "2b792e5debb8d32975dadef246e43a84";
    
    useEffect(() => {
        window._AMapSecurityConfig = {
            securityJsCode: '9eb0cbec4c3ccdd4fc5d7eafb4e37132',
        }
        return () => { window._AMapSecurityConfig = null }
    })


    messages.forEach((message) => {
        let geolocation = JSON.parse(message.data).data
        markersPosition = [...markersPosition, { position: { longitude: geolocation.longitude, latitude: geolocation.latitude } }]
    });

    const mapCenter = markersPosition.length > 0 ? { longitude: markersPosition[markersPosition.length - 1].position.longitude, latitude: markersPosition[markersPosition.length - 1].position.latitude } : { longitude: 118.9317, latitude: 32.1057 };


    return (
        <React.Fragment>
            <Box
                sx={{
                    ml: 12,
                    height: 400,
                    width: 800,
                }}
            >
                <Map
                    amapkey={YOUR_AMAP_KEY}
                    zoom={14}
                    center={mapCenter}
                    loading={
                        <Skeleton
                            animation="wave"
                            variant="rectangular"
                            sx={{ bgcolor: 'grey.200' }}
                            width={800}
                            height={400}
                        />
                    }
                    events={{
                        created: (map) => {
                            console.log('map created');
                        }
                    }}
                >
                    <InfoWindow
                        position={infoWindowPosition}
                        visible={false}
                        offset={[0, 0]}
                        isCustom={false}
                        content={"<div><h4>Greetings</h4><p>This is content of this info window</p></div>"}
                        size={{
                            width: 200,
                            height: 140,
                        }}
                    />
                    <Markers
                        markers={markersPosition}
                        events={{
                            click: (e, marker) => {
                                const extData = marker.getExtData();
                                infoWindowPosition = extData.position;
                                console.log(infoWindowPosition)
                            }
                        }}
                    />
                </Map>
            </Box>
        </React.Fragment>
    )
}