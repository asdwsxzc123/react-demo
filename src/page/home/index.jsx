import React from "react";
import PageTitle from 'component/page-title/index.jsx'
class Home extends React.Component{
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <PageTitle title="首页"></PageTitle>
      </div>
    )
  }
}
export default Home