/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-no-comment-textnodes */
// 目录筛选组件
import React, { Component } from 'react'
import { Picker } from 'antd-mobile';

const FliterList = [
  [
    { value: 'loan', label: '放款' },
    { value: 'balance', label: '余额' },
    { value: 'income', label: '收入' },
    { value: 'passRate', label: '通过率' },
    { value: 'risk', label: '风控' },
    { value: 'fund', label: '资金' }
  ]
];

export default class FliterPicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fullData: {},
      sValue: ["loan"],
      colorValue: ['#00FF00'],
    };
  }


  scrollToAnchor = (anchorName) => {
    if (anchorName) {
      let anchorElement = document.getElementById(anchorName);
        if(anchorElement) {
            // anchorElement.scrollIntoView(
            //     {behavior: 'smooth'}
            // );
            window.scrollTo({
              left: 0,
              top: anchorElement.offsetTop - 50,
              behavior: 'smooth',
            });
        }
      }
  }

  onPickerChange = (val) => {
    const d = [...this.state.sValue];
    console.log(d)
    const fullData = FliterList[0].find(item => { return item.value === val[0] });
    this.setState({
      sValue: d,
      fullData,
    });
    this.scrollToAnchor(val[0])
  }
  
  render() {
    return (<div className="filter-picker">
        <Picker
          data={FliterList}
          title="目录"
          cascade={false}
          extra="请选择(可选)"
          value={this.state.sValue}
          onOk={this.onPickerChange}
        >
        <div className="picker-content">
            <span>{this.state.fullData.label || "目录选择"}</span>
            <img src={require('../../../images/icon-filter.png')} alt='filter'/>
        </div>
        </Picker>
    </div>);
  }
}

