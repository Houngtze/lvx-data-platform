// 图表容器
import React, { Component } from 'react'
import { SegmentedControl } from 'antd-mobile'
import HYJModelSelector from "./HYJModelSelector"
import ChartBottomSelector from "./ChartBottomSelector"
import ExtraHeader from "./ExtraHeader"

export default class ChartWrapper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data,
      currentTime: 0,
      currentData: props.data.moduleData[0].chartOption,
      condition: props.condition,
      isShowdayCount: props.isShowdayCount,
      chartColor: props.chartColor
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data,
      currentTime: 0,
      currentData: nextProps.data.moduleData.length && nextProps.data.moduleData[0].chartOption,
      condition: nextProps.condition
    });
  }

  onSegChange  = (e) => {
    const seclectIndex = e.nativeEvent.selectedSegmentIndex
    this.setState({
      currentTime: seclectIndex,
      currentData: this.state.data.moduleData[seclectIndex].chartOption
    })
  }
  
  getModelData(val) {
    const data = [
      ...[{
        value: this.state.data.id,
        type: "moduleId"
      }],
      ...[val]
    ]
    this.props.getModelData(data)
  }

  render() {
    let { title, id, moduleData, provinces, paymentNum, channels, products, description } = this.state.data
    const statPeriod = []
    moduleData.forEach(item => { statPeriod.push(item.period) })
    const { chartColor, currentData } = this.state
    return (
      <div className="chart-wrapper">
        <div className="header">
          <h3>
            {title}
            {currentData.title && currentData.title.subtext && <ExtraHeader data={currentData.title.subtext}/>}
          </h3>
          <div className="header-content">
            {
              <HYJModelSelector 
                channels={channels} 
                paymentNum={paymentNum}
                provinces={provinces}
                getModelData={this.getModelData.bind(this)} />
            }
            {
              statPeriod && statPeriod.length > 1 &&
              <SegmentedControl 
                  selectedIndex={this.state.currentTime} 
                  values={statPeriod} 
                  className="chart-time-select" 
                  onChange ={this.onSegChange } /> 
              /*日周月选择*/
            }
          </div>
        </div>
        <div className="content">
          { 
            this.props.children && 
            React.Children.map(this.props.children, (child) => 
            React.cloneElement(child, { 
              currentData: {...this.props.children.props, ...currentData},
              chartColor: chartColor,
              moduleId: id
            }))
          }
        </div>
       <div className="footer">
          <ChartBottomSelector products={products} moduleId={id} desc={description} getModelData={this.getModelData.bind(this)}/>
        </div> 
      </div>
    )
  }
}
