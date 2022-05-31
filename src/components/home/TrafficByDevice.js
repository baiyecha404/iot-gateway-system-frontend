import ReactECharts from "echarts-for-react";
import { Box, Card, CardHeader, Divider, CardContent } from "@mui/material";
import React from "react";


export default function Chart() {
    const option = {
        title: {
            text: "",
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                name: '来自',
                type: 'pie',
                radius: '50%',
                data: [
                    { value: 848, name: '桌面端' },
                    { value: 235, name: '移动端' },
                    { value: 40, name: '平板' },
                ],
                color: ['#5048e5', '#10B981', '#ffb020'],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    return (
        <React.Fragment>
            <Card>
                <CardHeader
                    title="流量设备"
                />
                <Divider />
                <CardContent>
                    <Box
                        sx={{
                            height: 350,
                            position: 'relative'
                        }}
                    >
                        <ReactECharts
                            option={option}
                            style={{ height: 350 }}
                        />
                    </Box>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}