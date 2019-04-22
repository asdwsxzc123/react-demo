import React from "react";
import PageTitle from 'component/page-title/index'
import {Link} from 'react-router-dom'
class ErrorPage extends React.Component{
  render() {
    return (
      <div>
        <PageTitle title="错误页面"></PageTitle>
        <div>
          <Link to="/">点我回到首页</Link>
        </div>
      </div>

    )
  }
}
export default ErrorPage