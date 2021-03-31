/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { Component } from 'react'
import { Popover } from 'antd-mobile';
// 金额数据气泡组件
class PagePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      popData: props.popData
    };
  }
  
  handleVisibleChange = (visible) => {
    this.setState({
      visible,
    });
  };
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      popData: nextProps.popData
    });
  }

  render() {
    return (
        <Popover
          overlayClassName="fortest"
          overlayStyle={{ color: 'currentColor' }}
          visible={this.state.visible}
          overlay={
            this.state.popData && this.state.popData.detail.length &&
            <div className="pop-list">
              <h4 className="pop-title">{this.state.popData.title}</h4>
              <ul>
                { this.state.popData.detail.length && 
                  this.state.popData.detail.map((item, index) => {
                    return <li key={index}>
                      <span>{item.product}</span>
                      <span>{item.value + (this.state.popData.title.slice(-2).indexOf("笔") > -1 ? "笔" : (this.state.popData.title.slice(-2).indexOf("万") > -1 ? "万" : "元"))}</span>
                    </li>
                  }) 
                }
              </ul>
            </div>
          }
          align={{
            overflow: { adjustY: 0, adjustX: 0 },
            offset: [-10, 5],
          }}
          onVisibleChange={this.handleVisibleChange}
        >
          {this.props.children}
        </Popover>
    );
  }
}

export default PagePicker
