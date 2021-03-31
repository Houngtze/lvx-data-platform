import React, { Component } from 'react'
import SectionBlock from "../SectionBlock"
import ChartWrapper from "../chart/ChartWrapper"
import { filterChart } from "../chart/FilterChart"
import { getFundData } from "../../../api"
import { formatDate } from "../../../utils"


export default class Fund extends Component {
  constructor(props) {
    super(props)
    this.state = {
      FundData: "",
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
   requestFundData(selected) {
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
      getFundData({
        ...{
          updateDate: this.state.date
        },
        ...param
      }).then(res => {
        this.setState({
          FundData: res.data
        })
      })
    });
  }
  
  componentWillReceiveProps(nextProps) {
    const { FundData, conditionData, date } = nextProps
    this.setState({
      data: FundData, 
      condition: conditionData,
      date:  formatDate(date)
    });
    getFundData({
      updateDate: formatDate(date)
    }).then(res => {
      this.setState({
        FundData: res.data
      })
    })
  }

  render() {
    const moduleOptions = (this.state.FundData && this.state.FundData.moduleOptions) || []
    const condition = this.state.condition
    return (<div className="data-block" href="#" id='fund'>
    <SectionBlock title="资金">
      {{content: [
          <div className="chart-block" key="chart">
            {
              moduleOptions.length ? moduleOptions.map((item,index) => {
                return <ChartWrapper 
                      data={item} 
                      condition={condition}  
                      key={index} getModelData={this.requestFundData.bind(this)}>
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

