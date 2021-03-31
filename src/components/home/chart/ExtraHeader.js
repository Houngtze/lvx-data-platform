// 图表容器
import React, { Component } from 'react'

export default class ChartWrapper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data
    }
  }

  render() {
    const subText = this.state.data.split(":")
    return (
      <div className="header-extra">
        <div className="extra-content">
          <div>{subText[0]}</div>
          <div>{subText[1]}</div>
        </div>
    </div>
    )
  }
}
