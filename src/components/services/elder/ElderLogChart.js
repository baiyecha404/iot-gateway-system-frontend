import React from "react";
import ReactECharts from "echarts-for-react";


export default function ElderLogChart(props) {

    const { logs } = props;
    const normalNum = logs.filter((log) => log.severity === "normal").length
    const warningNum = logs.filter((log) => log.severity === "warning").length

    const option = {
        title: {
            text: '日志状态',
            subtext: '',
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
                color: ['#4caf50', '#ffb020', '#d14343'],
                name: 'Log Data',
                type: 'pie',
                radius: '50%',
                data: [
                    { value: normalNum, name: 'Normal' },
                    { value: warningNum, name: 'Warning' },
                    { value: logs.length - normalNum - warningNum, name: 'Error' },
                ],
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
            <ReactECharts
                option={option}
                style={{ height: 400 }}
            />
        </React.Fragment>
    )
}
