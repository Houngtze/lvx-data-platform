import request from './request'
// eslint-disable-next-line
import mockLoanData from "./mock/laon.json"

const url_head  = process.env.NODE_ENV === "development" ? 'http://data-analysis-test.lvxtech.com' : 'http://data-analysis.lvxtech.com'

const requestConfig = {
  "clientId": "663a2fe74f1941588041d12aebbb846c"
}
// eslint-disable-next-line
const mockData = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...data,
        $isSuccess: data.result === 'success',
        $message: data.result === 'success' ? data.message : `${data.message} [${data.code}]`,
      });
    }, 200 + (Math.random() * 1300));
  });
}
// 企业微信-获取用户基础信息
export const getUserBaseInfo = (param) => {
  return request({ url: url_head + "/workWechat/getUserBaseInfo", data: {...requestConfig, ...param} })
  // return mockData(mockLoanData)
}
// 放款数据
export const getLoanData = (param) => {
    return request({ url: url_head + "/cockpit/loan", data: {...requestConfig, ...param} })
    // return mockData(mockLoanData)
}
// 收入数据
export const getIncomeData = (param) => {
  return request({ url: url_head + "/cockpit/income", data: {...requestConfig, ...param} })
}
// 余额
export const getBalanceData = (param) => {
  return request({ url: url_head + "/cockpit/balance", data: {...requestConfig, ...param} })
}
// 通过率
export const getPassRateData = (param) => {
  return request({ url: url_head + "/cockpit/passRate", data: {...requestConfig, ...param} })
}
// 风控
export const getRiskData = (param) => {
  return request({ url: url_head + "/cockpit/risk", data: {...requestConfig, ...param} })
}
// 资金
export const getFundData = (param) => {
  return request({ url: url_head + "/cockpit/fund", data: {...requestConfig, ...param} })
}
// 获取筛选条件
export const getConditionData = (param) => {
  return request({ url: url_head + "/cockpit/conditionData", data: {...requestConfig, ...param} })
}

// 独立调用接口
export const requestApi = (url, data) => {
  return request({ url, data })
}

export const api =  {
  getLoanData,
  getIncomeData,
  getBalanceData,
  getPassRateData,
  getRiskData,
  getFundData,
  getConditionData
}