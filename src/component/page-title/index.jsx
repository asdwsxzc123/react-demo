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
        <Breadcrumb>
            <Breadcrumb.Item style={{fontSize: '18px',fontWeight: 'bold'}}>{this.props.title}</Breadcrumb.Item>
            {this.props.children}
        </Breadcrumb>
      </div>
    )
  }
}
export default PageTitle