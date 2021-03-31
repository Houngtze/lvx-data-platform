import React from 'react';
import { Pie } from '@ant-design/charts';
const DemoPie = (props) => {
  
  const propsData = props.currentData

  const data = propsData.series[0].data
  
  const config = {
    forceFit: true,
    radius: 0.8,
    data,
    angleField: 'value',
    colorField: 'name',
    legend: {
      visible: true,
      position: "bottom"
    },
    tooltip: {
      formatter: (...args)=>{
        return {
          name: args.slice(-1)[0],
          value: `${args.slice(-2)[0]}万`
        }
      }
    },
    color: ['#7AA2F3', '#A1E6C3', '#6B7A99', '#F2CD7F', '#F29779', '#AFD8FF', '#615FD2', '#957AF2', '#79CEF2'],
  };
  return <div className="pie">
    {!data.length ? <div className="no-data">暂无数据</div> : <Pie {...config} />}
  </div>;
};
export default DemoPie;