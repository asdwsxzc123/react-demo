import { getData, postData, formData } from "util/ajax";
export const getOrderList = params =>
  getData("/manage/order/list.do", params);
export const getOrderInfo = params =>
  getData("/manage/order/detail.do", params);