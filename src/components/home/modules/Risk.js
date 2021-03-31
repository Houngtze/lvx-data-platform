import React, { Component } from 'react'
import SectionBlock from "../SectionBlock"
import ChartWrapper from "../chart/ChartWrapper"
import { filterChart } from "../chart/FilterChart"
import { getRiskData } from "../../../api"
import { formatDate } from "../../../utils"

export default class Risk extends Component {
  constructor(props) {
    super(props)
    this.state = {
      RiskData: "",
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
   requestRiskData(selected) {
    let { province, channel, paymentNum, productName, moduleId, RiskData } = this.state
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
      getRiskData({
        ...{
          updateDate: this.state.date
        },
        ...param
      }).then(res => {
        const index = RiskData.moduleOptions.findIndex(item => { return item.id === param.moduleId})
        const item = res.data.moduleOptions.find(item => { return item.id === param.moduleId})
        console.log(index)
        console.log(item)
        RiskData.moduleOptions[index] = item || {}
        this.setState({
          RiskData: RiskData
        })
      })
    });
  }
  
  componentWillReceiveProps(nextProps) {
    const { RiskData, conditionData, date } = nextProps
    this.setState({
      data: RiskData, 
      condition: conditionData,
      date:  formatDate(date)
    });
    getRiskData({
      updateDate: formatDate(date)
    }).then(res => {
      this.setState({
        RiskData: res.data
      })
    })
  }

  render() {
    const moduleOptions = (this.state.RiskData && this.state.RiskData.moduleOptions) || []
    const condition = this.state.condition
    return (<div className="data-block" href="#" id='risk'>
    <SectionBlock title="风控">
      {{content: [
          <div className="chart-block" key="chart">
            {
              moduleOptions.length ? moduleOptions.map((item,index) => {
                return <ChartWrapper 
                      data={item} 
                      condition={condition}  
                      key={index} getModelData={this.requestRiskData.bind(this)}>
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