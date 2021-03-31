import React from 'react';
import { Line } from '@ant-design/charts';
const DemoLine = (props) => {
  const propsData = props.currentData
  const moduleId = props.moduleId
  let data = []
  let lineMax = 0
  let lineMin = propsData.series ? propsData.series[0].data[0] : 0
  let isDouble = propsData.legend && (propsData.legend.data.length > 1 ? true : false)
  propsData.series && propsData.series.forEach(item => {
    if(item.data && item.data.length){
      item.data.forEach((k, i) => {
        if(k > lineMax) {
          lineMax = k
        }
        if(k < lineMin) {
          lineMin = k
        }
        data.push({
          name: item.name,
          type: item.name,
          value: k,
          date: propsData.xAxis[0].data[i]
        })
      })
    }
  });
  const config = {
    padding: "auto",
    height: 300,
    forceFit: true,
    data,
    xField: 'date',
    yField: 'value',
    yAxis: {
      label: {
        formatter: v => {return moduleId === 'GroupIncomeLine' ? `${v}` : (v != 0 ? `${v}%` : v)}
      },
      tickCount: 5,
      max: moduleId === 'GroupIncomeLine' ? lineMax + lineMax * 0.2 : Math.min(lineMax + 5, 100),
      min: moduleId === 'GroupIncomeLine' ? lineMin : Math.max(lineMin - 5, 0),
    },
    label: {
      visible: true,
      type: 'point',
      formatter: v => {return moduleId === 'GroupIncomeLine' ? `${v}` : (v != 0 ? `${v}%` : "")}
    },
    legend: {
      visible: isDouble,
      position: 'top-left',
      // text: {
      //   formatter: v => {return moduleId === 'GroupIncomeLine' ? `${v}(万)` : v}
      // }
    },
    tooltip: {
      formatter: (...args)=>{
        return {
          name: moduleId === 'GroupIncomeLine' ? `${args.slice(-1)[0]}(万)` : args.slice(-1)[0] ,
          value: moduleId === 'GroupIncomeLine' ? args.slice(-2)[0] : `${args.slice(-2)[0]}%`
        }
      }
    },
    size: 1,
    seriesField: 'type',
    color: ['#6295F9', '#F6BD16', '#FAA219'],
  };

  return <div>
    { !data.length ? <div className="no-data">暂无数据</div> : <Line {...config} /> }
  </div>
  ;
};
export default DemoLine;