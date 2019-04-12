
import {baseUrl} from 'util/global.js'
import { message } from 'antd';

function postData(url, data) {
  // Default options are marked with *
  return fetch(baseUrl + url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json'
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // *client, no-referrer
  })
  .then(res => res.json())
  .then(res => {
    // res就是我们请求的repos
    return handleData(res) 
  }).catch((e) => {})
}
function getData(url) {
  // Default options are marked with *
  return fetch(baseUrl + url, {
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json'
    },
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // *client, no-referrer
  })
  .then(res => res.json())
  .then(res => {
    // res就是我们请求的repos
    return handleData(res) 
  }).catch((e) => {})
}
function handleData(res) {
  if (res.state !== '0') {
    message.warning(res.message || '暂无提示');
  }
  return res
}
export {
  postData,
  getData
}