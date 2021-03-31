import React, { Component } from 'react';
import {  Router as HashRouter,Route, Switch, Redirect } from 'react-router-dom'
import { createHashHistory } from "history";
import smoothscroll from 'smoothscroll-polyfill';
import { Toast } from 'antd-mobile';
import Home from '../containers/Home'
import Error from '../containers/Error'
import '../assets/App.less';
import QYWeixin from '../wechat'

const history = createHashHistory();
// 解决部分手机平滑滚动
smoothscroll.polyfill();

if (process.env.NODE_ENV !== "production") {
  document.write('<script src="//cdn.jsdelivr.net/npm/eruda"></script>');
  document.write("<script>eruda.init();</script>");
  document.write('<script src="//cdn.bootcdn.net/ajax/libs/vConsole/3.3.4/vconsole.min.js"></script>');
  document.write('<script>var vConsole = new VConsole();</script>');
}
let loading = ""
const weixin = new QYWeixin()

class App extends Component {
  componentWillMount() {
    if(!weixin.isInQYWechat() && process.env.NODE_ENV !== "development") {
      history.replace({ pathname: "error", text: "请在企业微信内打开"})
    }
    loading = Toast.loading("加载中。。", 5)
  }

  render() {
    return (
      <HashRouter history={history}>
        <div className="App">
          <Switch history={history}>
            <Route name="home" path="/home" component={Home} history={history}/>
            <Route name="error" path="/error" component={Error} history={history}/>
            <Redirect to="/home" />
          </Switch>
        </div>
      </HashRouter>
    );
  }

}

export default App;
