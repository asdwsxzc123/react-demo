import React from "react";
import { Breadcrumb } from 'antd';

class PageTitle extends React.Component{
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    document.title = this.props.title
  }
  render() {
    return (
      <div className="page-title">
        <div style={{fontSize: '18px',fontWeight: 'bold'}}>{this.props.title}</div>
        {this.props.children}
      </div>
    )
  }
}
export default PageTitle