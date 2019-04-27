import { getData, postData, formData } from "util/ajax";
export const getProductList = params =>
  getData("/manage/product/search.do", params);
export const setProductStatus = params => 
  postData("/manage/product/set_sale_status.do",params);
export const getCategoryList = params => 
  getData("/manage/category/get_category.do",params);
export const uploadProductImg = params => 
formData("/manage/product/upload.do",params);