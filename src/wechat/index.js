// import sha1 from'sha1'
import {getUserBaseInfo} from '../api'
// import { Toast } from 'antd-mobile';

export default class QYWeixin {
  // 企业微信判断
  isInQYWechat() {
    const ua = window.navigator.userAgent.toLowerCase();
    const isInQYWeixin = (ua.match(/MicroMessenger/i) == 'micromessenger') && (ua.match(/wxwork/i) == 'wxwork')
    if(!isInQYWeixin){
      return false
    }
    return true
  }
  // 获取企业微信访问权限
  isAllowAccess(code) {
    console.log(code)
    return new Promise(async resolve => {
      const res = await getUserBaseInfo({code})
      if(res.data.errcode === 0 && res.data.allowAccess) {
        resolve(true)
      } else{
        resolve(false)
      }
    })
  }
}

