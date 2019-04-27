import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import ProdcutList from 'page/product/index/index'
import ProductSave from 'page/product/index/save'
class ProductRouter extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/product/index" component={ProdcutList} />
          <Route path="/product/save" component={ProductSave}></Route>
          <Redirect exact from="/product" to="/product/index"></Redirect>
        </Switch>
      </Router>
    );
  }
}

export default ProductRouter;