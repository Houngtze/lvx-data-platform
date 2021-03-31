/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { Component } from 'react'

export default class FliterPicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      headerClass: "page-header"
    }
  }

  windowOnScroll() {
    let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
    if(scrollTop > 50) {
      this.setState({
        headerClass: "page-header fixed"
      })
    } else{
      this.setState({
        headerClass: "page-header"
      })
    }
  }

  componentDidMount () {
    window.addEventListener('scroll', this.windowOnScroll.bind(this), true)
  }

  render() {
    return (<div className={this.state.headerClass}>
      {this.props.children && (Array.isArray(this.props.children) ?
        this.props.children.map((child) => {
            return child
        }) : this.props.children) }
    </div>);
  }
}

