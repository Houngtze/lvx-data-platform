import React, { Component } from 'react'
import SectionBlock from "../SectionBlock"
import ChartWrapper from "../chart/ChartWrapper"
import { filterChart } from "../chart/FilterChart"
import { getPassRateData } from "../../../api"
import { formatDate } from "../../../utils"

export default class PassRate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      PassRateData: "",
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
   requestPassRateData(selected) {
    let { province, channel, paymentNum, productName, moduleId, PassRateData } = this.state
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
        moduleId: selected[0].moduleId
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
      getPassRateData({
        ...{
          updateDate: this.state.date
        },
        ...param
      }).then(res => {
        const index = PassRateData.moduleOptions.findIndex(item => { return item.id === param.moduleId})
        const item = res.data.moduleOptions.find(item => { return item.id === param.moduleId})
        PassRateData.moduleOptions[index] = item
        this.setState({
          PassRateData: PassRateData
        })
      })
    });
  }
  
  componentWillReceiveProps(nextProps) {
    const { PassRateData, conditionData, date } = nextProps
    this.setState({
      data: PassRateData, 
      condition: conditionData,
      date:  formatDate(date)
    });
    getPassRateData({
      updateDate: formatDate(date)
    }).then(res => {
      this.setState({
        PassRateData: res.data
      })
    })
  }

  render() {
    const moduleOptions = this.state.PassRateData.moduleOptions || []
    const condition = this.state.condition
    return (<div className="data-block" href="#" id='passRate'>
    <SectionBlock title="通过率">
      {{content: [
          <div className="chart-block" key="chart">
            {
              moduleOptions.length ? moduleOptions.map((item,index) => {
                return <ChartWrapper 
                      data={item} 
                      condition={condition}  
                      key={index} getModelData={this.requestPassRateData.bind(this)}>
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

