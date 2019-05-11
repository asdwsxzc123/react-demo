import React from "react";
import {Link} from 'react-router-dom'
import PageTitle from "component/page-title/index";
import {getHomeCount} from 'service/user'
import {STATUS_OK} from 'util/global'
import './index.scss'
class Home extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      userCount: 0,
      productCount: 0, 
      orderCount: 0,
    };
  }
  componentDidMount() {
    this.loadCount()
  }
  async loadCount() {
    let res = await getHomeCount()
    if (res.status === STATUS_OK) {
      this.setState(res.data)
    }
  }
  render() {
    return (
      <div>
        <PageTitle title="首页"></PageTitle>
        <div className="col-md-4">
          <Link to="/user" className="color-box brown">
            <p className="count">{this.state.userCount}</p>
            <p className="desc">
              <i className="fa fa-user-o" />
              <span>用户总数</span>
            </p>
          </Link>
        </div>
        <div className="col-md-4">
          <Link to="/product"  className="color-box green">
            <p className="count">{this.state.productCount}</p>
            <p className="desc">
              <i className="fa fa-list" />
              <span>商品总数</span>
            </p>
          </Link>
        </div>
        <div className="col-md-4">
          <Link to="/order"  className="color-box blue">
            <p className="count">{this.state.orderCount}</p>
            <p className="desc">
              <i className="fa fa-check-square-o" />
              <span>订单总数</span>
            </p>
          </Link>
        </div>
      </div>
    )
  }
}
export default Home