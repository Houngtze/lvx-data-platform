import React, { Component } from 'react'

class GoTop extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isShow: false
    }
  }
  scrollToTop = () => {
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: 'smooth',
    });
  }

  handleScroll() {
    let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
    if(scrollTop > 150) {
      this.setState({
        isShow: true
      })
    } else{
      this.setState({
        isShow: false
      })
    }
  }

  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll.bind(this), true)
  }

  render() {
    const IMG_goTop = require("../images/go-top@2x.png")
    return (<div>
      {
        this.state.isShow && <div className="go-top" onClick={this.scrollToTop}>
          <img src={IMG_goTop} alt="go-top" />
        </div>
      }
    </div>);
  }
}

export default GoTop