import React, { Component } from 'react'
import SectionBlock from "../SectionBlock"
import ChartWrapper from "../chart/ChartWrapper"
import { filterChart } from "../chart/FilterChart"
import { getIncomeData } from "../../../api"
import { formatDate } from "../../../utils"

export default class Income extends Component {
  constructor(props) {
    super(props)
    this.state = {
      IncomeData: "",
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
   requestIncomeData(selected) {
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
        param[item.type] = ["全国", "模式", "期数", "整体"].includes(item.value) ? "" : item.value
      })
      this.setState(param)
    }
    return new Promise((resolve) => {
      getIncomeData({
        ...{
          updateDate: this.state.date
        },
        ...param
      }).then(res => {
        this.setState({
          IncomeData: res.data
        })
      })
    });
  }
  
  componentWillReceiveProps(nextProps) {
    const { conditionData, date } = nextProps
    this.setState({
      condition: conditionData,
      date:  formatDate(date)
    });
    getIncomeData({
      updateDate: formatDate(date)
    }).then(res => {
      this.setState({
        IncomeData: res.data
      })
    })
  }

  render() {
    const moduleOptions = this.state.IncomeData.moduleOptions || []
    const condition = this.state.condition
    return (<div className="data-block" href="#" id='income'>
    <SectionBlock title="收入">
      {{content: [
          <div className="chart-block" key="chart">
            {
              this.state.IncomeData ? moduleOptions.length && moduleOptions.map((item,index) => {
                return <ChartWrapper 
                      data={item} 
                      condition={condition}  
                      key={index} getModelData={this.requestIncomeData.bind(this)}>
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

