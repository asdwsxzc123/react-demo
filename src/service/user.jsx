import { postData, getData } from "util/ajax.js";
// 用户登录
export const login = userInfo => {
  return postData("/manage/user/login.do", userInfo);
};
// 用户登出
export const logout = () => {
  return postData("/user/logout.do");
};
// 用户数据
export const getHomeCount = () => {
  return getData("/manage/statistic/base_count.do");
};
// 用户列表
export const getUserList = (params) => {
  return getData("/manage/user/list.do",params);
};
