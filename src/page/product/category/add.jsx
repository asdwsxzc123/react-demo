import React from "react";
import { Input, Modal } from "antd";
import { setCategoryName, addCategoryName } from "service/product";
import { okTips } from "util/common";
import { STATUS_OK } from "util/global";

class CategoryDlg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryParams: {
        categoryId: 0,
        categoryName: '',
        isNew: false
      },
      visible: false,
      title: '添加品类'
    }
  }
  componentWillReceiveProps(props) {
    this.setState({categoryParams: props.categoryParams},() => {
      this.setTitle(this.state.categoryParams.isNew)
    })
  }
  
  async onSubmit(e, isNew=this.state.categoryParams.isNew) {
    let categoryParams = this.state.categoryParams,
      res;
    if (isNew) {
      categoryParams.parentId = categoryParams.categoryId;
      delete categoryParams.categoryId;
      res = await addCategoryName(categoryParams);
    } else {
      res = await setCategoryName(categoryParams);
    }
    if (res.status === STATUS_OK) {
      okTips(res.data);
      this.changeVisible(false);
      this.getList();
    }
  }
  
  changeName(row) {
    let categoryParams = this.state.categoryParams
    categoryParams.categoryName = row.categoryName
    this.setState({categoryParams})
  }
  // input值变化
  onChangeValue(e) {
    var categoryName = e.target.value;
    this.changeName({
      categoryName
    })
  }
  // 弹框显示隐藏
  changeVisible(visible) {
    this.props.onChangeVisible(visible);
    if (!visible) {
      this.setState({categoryParams: {
        categoryId: 0,
        categoryName: '',
        isNew: false
      }})
    }
  }
  // 设置标题
  setTitle(isNew) {
    let title = isNew ? '添加品类' : '更新品类';
    this.setState({title})
  }
  getList() {
    this.props.getList()
  }
  onKeydown(e) {
    if (e.keyCode === 13) {
      this.onSubmit()
    }
  }
  render() {
    return (
      <Modal
        title={this.state.title}
        visible={this.props.visible}
        onOk={() => this.onSubmit()}
        onCancel={() => this.changeVisible(false)}
        okText="确认"
        cancelText="取消"
      >
        <Input placeholder="请输入名称" 
          value={this.state.categoryParams.categoryName} 
          allowClear 
          onKeyDown={e => this.onKeydown(e)}
          onChange={(e) => this.onChangeValue(e)} />
      </Modal>
    )
  }
  
}

export default CategoryDlg