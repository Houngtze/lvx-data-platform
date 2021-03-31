import React, { Component } from 'react'
import SectionBlock from "../SectionBlock"
import ChartWrapper from "../chart/ChartWrapper"
import { filterChart } from "../chart/FilterChart"
import { getBalanceData } from "../../../api"
import { formatDate } from "../../../utils"

const chartColor = [
  { columColor: "#3C79F9"},
  { columColor: "#7AA2F3"},
  { columColor: "#A1E6C3"},
  { columColor: "#6B7A99"},
  { columColor: "#F2CA79"},
  { columColor: "#F29779"},
]

export default class Balance extends Component {
  constructor(props) {
    super(props)
    this.state = {
      BalanceData: "",
      condition: "",
      date: formatDate(props.date),
      province: "",
      channel: "",
      paymentNum: "",
      productName: "",
      moduleId: ""
    }
  }
   // 请求放款数据
   requestBalanceData(selected) {
    let { province, channel, paymentNum, productName, moduleId } = this.state
    let param = {
      province,
      channel,
      paymentNum,
      productName,
      moduleId
    }
    if(selected[0].value !== moduleId) {
      param = {
        province: "",
        channel: "",
        paymentNum: "",
        productName: "",
        moduleId: selected[0].value
      }
    }
    if (selected && selected.length) {
      // setStae不是同步，要先赋值再设置state
      selected.forEach(item => {
        param[item.type] = ["全国", "模式", "期数", "整体", "集团"].includes(item.value) ? "" : item.value
      })
      this.setState(param)
    }
    return new Promise((resolve) => {
      getBalanceData({
        ...{
          updateDate: this.state.date
        },
        ...param
      }).then(res => {
        this.setState({
          BalanceData: res.data
        })
      })
    });
  }
  
  componentWillReceiveProps(nextProps) {
    const { BalanceData, conditionData, date } = nextProps
    this.setState({
      data: BalanceData, 
      condition: conditionData,
      date:  formatDate(date)
    });
    getBalanceData({
      updateDate: formatDate(date)
    }).then(res => {
      this.setState({
        BalanceData: res.data
      })
    })
  }

  render() {
    const moduleOptions = this.state.BalanceData.moduleOptions || []
    const condition = this.state.condition
    return (<div className="data-block" href="#" id='balance'>
    <SectionBlock title="余额">
      {{content: [
          <div className="chart-block" key="chart">
            {
              moduleOptions.length ? moduleOptions.map((item,index) => {
                return <ChartWrapper 
                        data={item} condition={condition} key={index}
                        chartColor={chartColor[index]}
                        getModelData={this.requestBalanceData.bind(this)}>
                      {
                        filterChart(item.chartType)
                      }
                    </ChartWrapper>
              }) : <div></div>
            }
          </div>
        ]
      }}
    </SectionBlock>
  </div>)
  }
}

