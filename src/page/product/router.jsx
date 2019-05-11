import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import ProdcutList from 'page/product/index/index'
import ProductSave from 'page/product/index/save'
import ProductDetail from 'page/product/index/detail'
import categoryList from 'page/product/category/index'
class ProductRouter extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/product/index" component={ProdcutList} />
        <Route path="/product/save/:pid?" component={ProductSave}></Route>
        <Route path="/product/detail/:pid" component={ProductDetail}></Route>
        <Redirect exact from="/product" to="/product/index"></Redirect>
        <Route path="/product/category/:categoryId?" component={categoryList} />
      </Switch>
    );
  }
}

export default ProductRouter;