import React from 'react'
import ReactDom from 'react-dom'
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom'  
import Layout1 from 'component/layout/index.jsx'
import Login from 'page/login/index.jsx'
import Home from 'page/home/index.jsx'
import "antd/dist/antd.css";
import 'font-awesome/css/font-awesome.min.css'
import './scss/common.scss'
class App extends React.Component{
  render(){
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/" render={props => (
            <Layout1>
              <Switch>
                <Route exact path='/' component={Home}></Route>
                <Redirect from="*" to="/"></Redirect>
              </Switch>
            </Layout1>
          )}></Route>

        </Switch>
      </Router>
    )
  }
}
ReactDom.render(
  <App></App>
  ,
  document.getElementById('app')
)