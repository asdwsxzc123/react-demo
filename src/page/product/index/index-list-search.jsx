import React from "react";
import { Button, Input } from "antd";
const Search = Input.Search;
class ListSearch extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      productName: ''
    }
  }
  onValueChange(e) {
    this.setState({
      productName: e.target.value
    })
  }
  onSearchKeyword(e) {
   if(e.keyCode === 13) {
     this.onSearch()
   }
  }
  onSearch() {
    this.props.onSearch(this.state.productName)
  }
  render() {
    return (
      <Search
        placeholder="输入商品名"
        enterButton="Search"
        size="large"
        style={{ width: 400 }}
        onChange={(e) => this.onValueChange(e)}
        onKeyUp={e => this.onSearchKeyword(e)}
        onSearch={e => this.onSearch(e)}
      ></Search>
    )
  }
}
export default ListSearch