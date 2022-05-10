import React from "react";
import ReactECharts from "echarts-for-react";
import { Grid } from "@mui/material";;

export default function ElderHealth() {

  // get a random number from 500 to 1000
  const currStep = Math.floor(Math.random() * (1000 - 500 + 1)) + 500;

  const stepOption = {
    title: {
      text: '今日步数',
      subtext: ""
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        color: ['#4caf50', '#ffffff'],
        name: '步数',
        type: 'pie',
        radius: ['50%', '60%'],
        avoidLabelOverlap: true,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '24',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: currStep, name: `${currStep} / 1000` },
          { value: 1000 - currStep, name: '' },
        ]
      }
    ]
  };




  const heartRateData = [67, 88, 73, 81, 70, 82, 89]
  const currDate = new Date().getDay()
  heartRateData[currDate - 1] = {
    value: heartRateData[currDate - 1],
    itemStyle: {
      color: '#d14343'
    }
  }


  const heartBeatOption = {
    title: {
      text: '心率',
      subtext: ""
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '心率',
        label: {
          show: true
        },
        color: ["#688eff"],
        data: heartRateData,
        type: 'bar'
      }
    ]
  };



  return (
    <React.Fragment>
      <Grid container >
        <Grid item xs={6}>
          <ReactECharts
            option={stepOption}
            style={{ height: 300 }}
          />
        </Grid>
        <Grid item xs={6}>
          <ReactECharts
            option={heartBeatOption}
            style={{ height: 300 }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}