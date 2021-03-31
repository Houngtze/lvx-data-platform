import React, { Component } from 'react'

export default class Error extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.history.location.text
    };
  }

  render() {
    const text = this.state.text
    const errorImg = require("../images/no-products@2x.png")
    return <div className="error-page">
          <img src={errorImg} alt="error" />
         <p>{text || "[404]页面出错了。。"}</p>
    </div>
  }
}