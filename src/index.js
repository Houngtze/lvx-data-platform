import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import App from './components/App';
import './global/global';
import './global/global.css';
import * as serviceWorker from './serviceWorker';
import { initStore } from './store'
import 'antd-mobile/dist/antd-mobile.css';

ReactDOM.render(
  <Provider store={initStore()}>
    <App />
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
