import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import OrderList from 'page/order/index'
import OrderDetail from 'page/order/detail'
class OrderRouter extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/order/index" component={OrderList} />
        <Route path="/order/detail/:pid" component={OrderDetail}></Route>
        <Redirect exact from="/order" to="/order/index"></Redirect>
      </Switch>
    );
  }
}

export default OrderRouter;