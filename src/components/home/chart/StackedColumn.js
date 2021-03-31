import React from 'react';
import { StackedColumn } from '@ant-design/charts';
const DemoStackedColumn = (props) => {
  const propsData = props.currentData
  const data = []

  propsData.series && propsData.series.forEach(item => {
    if(item.data) {
      item.data.forEach((k, i) => {
        data.push({
          name: item.name,
          type: item.name,
          value: k,
          time: propsData.xAxis[0].data[i]
        })
      })
    }
  });

  const config = {
    forceFit: true,
    height: 350,
    data,
    xField: 'time',
    yField: 'value',
    yAxis: {
      visible: true,
      title: {
        visible: false,
        text: ""
      },
    },
    xAxis: {
      visible: true,
      title: {
        text: ""
      },
    },
    stackField: 'type',
    color: ['#7AA2F2', '#A1E6C3', '#6B7A99', '#A8CCEF', '#FDEDC2', '#F2CD7F', '#F29779'],
    legend: {
      position: 'top-center',
      // flipPage: true
      // text: {
      //   formatter: v => {return moduleId !== 'GroupDataCustBalance' ? `${v}(万)` : v}
      // },
    },
    tooltip: {
      formatter: (...args)=>{
        return {
          name: args.slice(-1)[0],
          value: `${args.slice(-2)[0]}(万)`
        }
      }
    },
  };
  return <div className="stacked-column">
     {!data.length ? <div className="no-data">暂无数据</div> : <StackedColumn {...config} />}
  </div>
};
export default DemoStackedColumn;