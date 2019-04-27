import { message } from 'antd';

export const type = function (obj) {
  var class2type = {};
  // 生成class2type映射
  "Boolean Number String Function Array Date RegExp Object Error Null Undefined".split(" ").map(function(item, index) {
      class2type["[object " + item + "]"] = item.toLowerCase();
  })
  return typeof obj === "object" || typeof obj === "function" ?
          class2type[Object.prototype.toString.call(obj)] || "object" :
          typeof obj;
}
export const setLocal = function (key, obj) {
  // 复杂数据类型
  if (type(obj) === 'object') {
    localStorage.setItem(key, JSON.stringify(obj))
    // 基础数据类型
  } else if (['number', 'string', 'boolean'].indexOf(type(obj)) >= 0) {
    localStorage.setItem(key, obj)
  } else {
    console.log('不支持本地存储');
  }
}
export const getLocal = function (key) {
  let obj = localStorage.getItem(key)
  if (obj) {
    return JSON.parse(obj)
  } else {
    return ''
  }
}

export const removeLocal = function (key) {
  localStorage.removeItem(key)
}

// 错误提示
export const errorTips =(errMsg) => {
  message.warning(errMsg || '暂无提示');
}
// 成功提示
export const okTips =(okMsg) => {
  message.success(okMsg || '暂无提示');
}
// 去首页
export const doLogin = () => {
  removeLocal('userInfo')
  window.location.href = '/login'
}