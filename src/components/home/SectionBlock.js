import React, { Component } from 'react'

class SecionBlock extends Component {
  state = {
    data: [],
    pickerValue: [],
    asyncValue: [],
    sValue: ['放款'],
    visible: false,
    colorValue: ['#00FF00'],
  };

  render() {
    return (<div className="section-block">
      <div className="title">
        <h2>{this.props.title}</h2>
      </div>
      <div className="content">

        {this.props.children && (Array.isArray(this.props.children.content) ?
        this.props.children.content.map((child) => {
            return child
        }) : this.props.children.content) }
    </div>
    </div>);
  }
}

export default SecionBlock