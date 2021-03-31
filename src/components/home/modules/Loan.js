import React, { Component } from 'react'
import SectionBlock from "../SectionBlock"
import MoneyCounter from "../MoneyCounter"
import ChartWrapper from "../chart/ChartWrapper"
import { filterChart } from "../chart/FilterChart"
import { api  } from "../../../api"
import { formatDate } from "../../../utils"

const chartColor = [
  { columColor: "#3C79F9"},
  { columColor: "#7AA2F3"},
  { columColor: "#A1E6C3"},
  { columColor: "#6B7A99"},
  { columColor: "#F2CA79"},
  { columColor: "#F29779"},
]

export default class Loan extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loanData: "",
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
   requestLoanData(selected) {
    let { province, channel, paymentNum, productName, moduleId, loanData } = this.state
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
      api.getLoanData({
        ...{
          updateDate: this.state.date
        },
        ...param
      }).then(res => {
        const index = loanData.moduleOptions.findIndex(item => { return item.id === param.moduleId})
        const item = res.data.moduleOptions.find(item => { return item.id === param.moduleId})
        loanData.moduleOptions[index] = item
        this.setState({
          loanData: loanData
        })
      })
    });
  }
  
  componentWillReceiveProps(nextProps) {
    const { loanData, conditionData, date } = nextProps
    this.setState({
      data: loanData, 
      condition: conditionData,
      date:  formatDate(date)
    });
    api.getLoanData({
      updateDate: formatDate(date)
    }).then(res => {
      this.setState({
        loanData: res.data
      })
    })
  }

  render() {
    const dayCount = this.state.loanData.dayCount || []
    const moduleOptions = this.state.loanData.moduleOptions || []
    const condition = this.state.condition
    return (<div className="data-block" href="#" id='loan'>
    <SectionBlock title="放款">
      {{content: [
          <div className="counter-block" key="counter">
            {
              dayCount.map((item,index) => {
                return <MoneyCounter val={item} key={index}/>
              })
            }
          </div>,
          <div className="chart-block" key="chart">
            {
              moduleOptions.length ? moduleOptions.map((item,index) => {
                return <ChartWrapper 
                  data={item} condition={condition} key={index}
                  chartColor={chartColor[index]}
                  getModelData={this.requestLoanData.bind(this)}>
                  {
                    filterChart(item.chartType)
                  }
                </ChartWrapper>
              })  : <div></div>
            }
          </div>
        ]
      }}
    </SectionBlock>
  </div>)
  }
}

