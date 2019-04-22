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
      <div>
        <Breadcrumb>
            <Breadcrumb.Item style={{fontSize: '18px',fontWeight: 'bold'}}>{this.props.title}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    )
  }
}
export default PageTitle