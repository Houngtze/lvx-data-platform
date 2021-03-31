// 筛选图表组件
import React from 'react'
import Pie from "./Pie"
import Line from "./Line"
import StackedColumn from "./StackedColumn"
import ColumnLine from "./ColumnLine"


export const filterChart = (type) => {
  let cop = ""
  console.log(type)
  if(type) {
    switch (type) {
      case "pie":
        cop = <Pie />
        break;
      case "line":
        cop =  <Line />
        break;
      case "stacked_column":
        cop =  <StackedColumn />
        break;
      case "column_line":
        cop =  <ColumnLine />
        break;
      default: 
        cop = <></>
    }
    return cop
  } else {
    return <></>
  }

}