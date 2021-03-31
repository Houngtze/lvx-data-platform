/* eslint-disable react/react-in-jsx-scope */
// 模式选择组件
import React, { Component } from 'react'
import { Picker } from 'antd-mobile';

// 格式化选择项
const formPickerOption = (arr) => {
  const list = [[]]
  if(arr && arr.length) {
    arr.forEach((item, index) => {
      list[0].push({
        value: item, 
        label: item
      })
    })
  }
  return list
}

export default class HYJModelSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      province: ["全国"],
      channel: ["模式"],
      paymentNum: ["期数"],
      provinceList: formPickerOption(props.provinces) || [[]],
      paymentNumList: formPickerOption(props.paymentNum) || [[]],
      channelList: formPickerOption(props.channels) || [[]],
    }
  }
  
  getPickerChange(val, type) {
    const fullData = this.state[`${type}List`][0].find(item => { return item.value === val[0] });
    this.setState({
      [type]: val
    });
    this.props.getModelData({
       ...{type},
       ...fullData
    })
  }

  onProvinceChange = (val) => {
    this.getPickerChange(val, "province")
  };

  onChannelChange = (val) => {
    this.getPickerChange(val, "channel")
  };

  onPaymentNumChange = (val) => {
    this.getPickerChange(val, "paymentNum")
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      provinceList: formPickerOption(nextProps.provinces) || [[]],
      paymentNumList: formPickerOption(nextProps.paymentNum) || [[]],
      channelList: formPickerOption(nextProps.channels) || [[]]
    });
  }

  render() {
    const { province, channel, paymentNum, provinceList,  channelList, paymentNumList } = this.state
    const iconSelect = require("../../../images/icon-select-arrow.png")
    return (<div className="model-select">
      <ul>
          { provinceList[0].length ? <Picker
            data={provinceList}
            title="省份"
            cascade={false}
            extra="请选择(可选)"
            value={this.state.province}
            onOk={this.onProvinceChange}
          >
           <li><span>{province}</span> <img src={iconSelect} alt="arrow"/></li>
          </Picker> : ""
          }
          { channelList[0].length ? <Picker
            data={channelList}
            title="模式"
            cascade={false}
            extra="请选择(可选)"
            value={this.state.channel}
            onOk={this.onChannelChange}
          >
            <li><span>{channel}</span> <img src={iconSelect} alt="arrow"/></li>
          </Picker> : ""
          }
          { paymentNumList[0].length ? <Picker
            data={paymentNumList}
            title="期数"
            cascade={false}
            extra="请选择(可选)"
            value={this.state.paymentNum}
            onOk={this.onPaymentNumChange}
          >
            <li><span>{paymentNum}</span> <img src={iconSelect} alt="arrow"/></li>
          </Picker> : ""
          }
      </ul>
    </div>)
  }
}