import React from "react";
import ReactECharts from "echarts-for-react";


export default function ChannelChartStatus(props) {
    const { dataName, messages } = props;
    const unit = messages[0].unit;

    const handleMessageData = (message) => {
        if (message.data_type === "bool") {
            return message.data === "on" ? 1 : -1
        }
        return message.data;
    }

    const resultData = messages.map((message) => handleMessageData(message))
    const dates = messages.map(message => message.created_at)

    const option = {
        title: {
            text: `${dataName}`
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: [dataName]
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: dates
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: `{value} ${unit === null ? "" : unit}`, 
            },
        },
        series: [
            {
                name: dataName,
                type: 'line',
                stack: 'Total',
                data: resultData,
                smooth: true
            }
        ]
    }

    return (
        <ReactECharts
            option={option}
            style={{ height: 300 }}
        />
    )
}