import React, { Component } from 'react'
import { Toast } from 'antd-mobile';
import PickerWrapper from "../components/home/picker/PickerWrapper"
import FliterPicker from "../components/home/picker/FliterPicker"
import DatePicker from "../components/home/picker/DatePicker"
import Loan from "../components/home/modules/Loan"
import Balance from "../components/home/modules/Balance"
import Income from "../components/home/modules/Income"
import PassRate from "../components/home/modules/PassRate"
import Risk from "../components/home/modules/Risk"
import Fund from "../components/home/modules/Fund"
import GoTop from "../components/GoTop"
import { getConditionData  } from "../api"
import { beforeFormatDate, getLinkParam } from "../utils"
import QYWeixin from '../wechat'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: beforeFormatDate(),
      filter: ["loan"],
      conditionData: "",
      history: props.history,
      isAllow: false
    }
    this.weixin = new QYWeixin()
  }

  setDate(date) {
    this.setState({
      date: new Date(date)
    })
  }

  // 请求筛选数据
  requestConditionData() {
    getConditionData().then(res => {
      if(!res.data.dateCondition) {
        return Toast.info("请求条件数据为空")
      }
      this.setState({
        conditionData: res.data,
        date: res.data.dateCondition.dateList.slice(-1)[0]
      })
    })
  }
  
  async isAllowToVisit() {
    const code = getLinkParam("code")
    if(!code) {
      return this.state.history.replace({ pathname: "error", text: "暂无权限访问，请联系管理员"})
    }
    await this.weixin.isAllowAccess(code).then(res => {
      const isAllow = res
      if(!isAllow) {
        return this.state.history.replace({ pathname: "error", text: "暂无权限访问，请联系管理员"})
      } else {
        this.setState({
          isAllow
        })
        this.requestConditionData()
      }
    })
    
  }

  async componentWillMount() {
    this.isAllowToVisit()
  }
  render() {
    const { conditionData, isAllow } = this.state
    return (
      <div className="home-container">
        {
          conditionData && <PickerWrapper>
          <FliterPicker/>
          <DatePicker 
            getDate={this.setDate.bind(this)}
            conditionData={conditionData}/>
        </PickerWrapper>
        }
        {
          isAllow && <div className="content">
            <Loan conditionData={conditionData} date={this.state.date} />
            <Balance conditionData={conditionData} date={this.state.date} />
            <Income conditionData={conditionData} date={this.state.date} />
            <PassRate conditionData={conditionData} date={this.state.date} />
            <Risk conditionData={conditionData} date={this.state.date} />
            <Fund conditionData={conditionData} date={this.state.date} />
        </div>
        }
        <GoTop/>
      
      </div>
    )
  }
}


export default Home
