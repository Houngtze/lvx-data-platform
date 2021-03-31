import axios from 'axios'
import { Toast } from 'antd-mobile';


function showToast(msg, duration = 3) {
  Toast.info(msg, duration)
}

function showLoading() {
  // loading = Toast.loading('加载中..', 0);
}

function hideLoading() {
  // Toast.hide()
}

export default function request({ url,  data, method = 'POST'}) {
    return new Promise((resolve, reject) => {
        let options = { url, method }
        if (method.toUpperCase() === 'GET') {
            options.params = data
        } else {
            options.data = data
        }
      showLoading()
        return axios(options)
            .then(res => {
                if (res.status === 200) {
                    if (res.data.token) {
                        localStorage.setItem('user', res.data.token)
                    }
                    res.data.code === '1000' ? resolve(res.data) : reject(res.data)
                  hideLoading()
                  if (res.data.code !== '1000') {
                    showToast(res.data.message)
                  }
                } else {
                    reject(res.data)
                }
            })
            .catch(error => {
                hideLoading()
                if (error.status !== 401) {
                    reject(error.response)
                }
            })
    })
}

axios.interceptors.request.use(config => {
    const user = localStorage.getItem('user')
    if (user) {
        config.headers.common['Authorization'] = 'Bearer ' + user
    }
    return config
})
