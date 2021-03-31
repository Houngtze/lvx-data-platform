/* eslint-disable react/react-in-jsx-scope */
import React, { Component } from 'react'
import MoneyPopover from "./MoneyPopover"
import CountUp from 'react-countup';
// 金额滚动组件
export default class MoneyCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.val.value,
      detail: props.val
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.val.value,
      detail: nextProps.val,
    });
  }

  render() {
    let { value, detail } = this.state;
    return <div className="money-counter">
      <MoneyPopover popData={this.state.detail}>
        <div className="pop-content">
          { <CountUp end={value} separator="," useGrouping={true} /> }
          {detail.title && <h4 className="counter-title">{detail.title}</h4>}
        </div>
      </MoneyPopover>
    </div>
  }
}
