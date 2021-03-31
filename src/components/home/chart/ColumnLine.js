import React from 'react';
import { ColumnLine } from '@ant-design/charts';
const DemoLine = (props) => {
  const propsData = props.currentData

  const columnData = []
  const lineData = []
  let barMax = 0,  // 柱状图最大值
      lineMax = 0  // 折线图最大值
  propsData.series && propsData.series.forEach(item => {
    if(item.data) {
      item.data.forEach((k, i) => {
        if(item.type === "bar") {
          if(k > barMax) {
            barMax = k
          }
          columnData.push({
            name: item.name,
            type: item.type,
            value: k,
            time: propsData.xAxis[0].data[i]
          })
        }
        if(item.type === "line") {
          if(k > lineMax) {
            lineMax = k
          }
          lineData.push({
            name: item.name,
            count: k,
            time: propsData.xAxis[0].data[i]
          })
        }
      })
    }
  });
  const data = [columnData, lineData]

  barMax = barMax + barMax * 0.1
  lineMax = lineMax + lineMax * 0.1
  const config = {
    forceFit: true,
    pixelRatio: 2,
    height: 300,
    data,
    xField: 'time',
    yField: ['value', 'count'],
    legend: {
      // visible: false,
      flipPage: true,
      text: {
        formatter: v => {return v === "value" ? "实际放款金额(万)" : v}
      }
    },
    tooltip: {
      formatter: (...args)=>{
        return {
          name: `${args.slice(-1)[0]}(万)`,
          value: args.slice(-2)[0]
        }
      }
    },
    label: {
      autoHide: true
    },
    lineSeriesField: 'name',
    columnConfig: { 
      color: props.chartColor ? props.chartColor.columColor : "#3C79F9", 
      colorField: 'name',
      xAxis: {
        title: {
          visible: false
        },
      },
      yAxis: {
        title: {
          visible: false
        },
        tickLine: {
          style: {
            color: "#8C8C8C",
            fontSize: "8px"
          }
        },
        max: barMax || 100,
      },
      legend: {
        visible: false,
        // flipPage: true
      },
    },
    lineConfig: {
      color: ['#61D7A7', '#F6BD16'],
      size: 1,
      point: { visible: true, size: 1, color: '#F6BD16' },
      meta: {
        range: [0, 1000]
      },

      leftConfig: {
        visible: false
      },
      yAxis: {
        visible: false,
        max: lineMax
      }
    },
  };
  
  return (
    <div className="column-line-block">
      <div className="click-hidden"></div>
      {
        !columnData.length && !lineData.length ? <div className="no-data">暂无数据</div> : <ColumnLine {...config} onlyChangeData={true}/>
      }
    </div>
  );
};
export default DemoLine;