/* eslint-disable react/react-in-jsx-scope */
// 模式选择组件
import React, { Component } from 'react'

export default class HYJModelSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: props.products,
      description: props.desc,
      activeProductIndex: 0
    }
  }
  
  selectProduct(index, data) {
    this.setState({
      activeProductIndex: index
    })
    this.props.getModelData({
      value: data,
      type: "productName"
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      options: nextProps.products,
    });
  }


  render() {
    const {  options, activeProductIndex, description } = this.state
    return (<div className="bottom-select">
      <ul>
      {
        options && options.map((item,index) => {
          return <li key={index} className={activeProductIndex === index ? "active" : ""}
              onClick={() => this.selectProduct(index, item)}>
            {item}
          </li>
        })
      }
      </ul>
      <div className="bottom-desc">{description}</div>
    </div>)
  }
}