import { getData, postData, formData } from "util/ajax";
export const getProductList = params =>
  getData("/manage/product/search.do", params);
export const getProductInfo = params =>
  getData("/manage/product/detail.do", params);
export const setProductStatus = params => 
  postData("/manage/product/set_sale_status.do",params);
export const getCategoryList = params => 
  getData("/manage/category/get_category.do",params);
export const setCategoryName = params => 
  getData("/manage/category/set_category_name.do",params);
export const addCategoryName = params => 
  getData("/manage/category/add_category.do",params);
export const uploadProductImg = params => 
  formData("/manage/product/upload.do",params);
export const saveProduct = params => 
  postData("/manage/product/save.do",params);