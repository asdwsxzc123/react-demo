
import {baseUrl} from 'util/config.js'
import axios from 'axios'
import Qs from 'qs'
import {errorTips, doLogin} from 'util/common.js'
import {Modal} from 'antd'
var instance = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers:{'Content-Type':'application/x-www-form-urlencoded'}
});

instance.interceptors.response.use(
  response => {
      // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
      // 否则的话抛出错误
      if (response.status === 200) {
        return Promise.resolve(response);
      } else {
        return Promise.reject(response);
      }
  },
  err => {
    return Promise.reject(err);
  }
)

export const request = (method,url,data) => {
  return new Promise((resolve, reject) => {
    instance[method](url, data)
    .then(response => {
      handleData(response.data)
      resolve(response.data)
    }).catch(err => {
      reject(err)
    })
  }).catch(err => {
    console.log('err', err);
  })
}
export const postData = (url, data = {}) => {
  return request('post', url, Qs.stringify(data))
}
export const getData = (url,data = {}) => {
  return request('get', url, {params: data})
}

function handleData(res) {
  let status = res.status
  if (status  === 10) {
    Modal.
    confirm({
      title: '提示',
      okText: '确认',
      cancelText: '取消',
      content: res.msg ||'',
      onOk() {
        doLogin()
      },
      onCancel() {
        doLogin()
      },
    });
  } else if (status !== 0) {
    errorTips(res.msg)
  }
}