import React from "react";
import ReactDom from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import "./scss/common.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import Layout1 from "component/layout/index.jsx";
import Login from "page/login/index.jsx";
import Home from "page/home/index.jsx";
import User from "page/user/index.jsx";
import ProductRouter from "page/product/router";
import ErrorPage from 'page/error/index';
class App extends React.Component {
  render() {
    let LayoutRouter = (
      <Layout1>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/product" component={ProductRouter}></Route>
          <Route path="/user/index" component={User}></Route>
          <Redirect exact from="/user" to="/user/index"></Redirect>
          <Route component={ErrorPage}/>
        </Switch>
      </Layout1>
    );
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" render={props => LayoutRouter} />
        </Switch>
      </Router>
    );
  }
}
ReactDom.render(<App />, document.getElementById("app"));
