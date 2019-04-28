import React from "react";
import PageTitle from "component/page-title/index";
import CategorySelector from "./category-selector";
import Avatar from "./upload";
import {errorTips,okTips} from 'util/common'
import {saveProduct} from 'service/product'
// 引入编辑器组件
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
class ProductSave extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.pid || 0,
      name: "",
      subtitle: "",
      categoryId: 0,
      parentCategoryId: 0,
      subImages: [],
      price: "",
      stock: "",
      detail: "",
      editorState: BraftEditor.createEditorState(null),
      status: 1 //商品状态1为在售
    };
  }
  // 简单字段的改变，比如商品名称，描述，价格，库存
  onValueChange(e) {
    let name = e.target.name,
      value = e.target.value.trim();
    this.setState({
      [name]: value
    });
  }
  onCategoryChange(categoryId, parentCategoryId) {
    this.setState({ categoryId, parentCategoryId });
  }
  onImgChange(subImage) {
    let subImages = this.state.subImages;
    subImages.push(subImage);
    this.setState({ subImages });
    console.log(this.state);
  }

  handleEditorChange (editorState) {
    this.setState({ editorState })
    const detail = this.state.editorState.toHTML()
    this.setState({detail})
  }
  async onSubmit() {
    let product = {
      name: this.state.name,
      subtitle: this.state.subtitle,
      categoryId: this.state.categoryId,
      parentCategoryId: this.state.parentCategoryId,
      subImages: this.state.subImages.join(','),
      price: this.state.price,
      stock: this.state.stock,
      detail: this.state.detail,
      status: this.state.status,
    }
    let productCheckResult = this.checkProduct(product);
    if (productCheckResult.status) {
      let res = await saveProduct(product);
      if (res.status === 0) {
        okTips(res.data)
      }
    } else {
      errorTips(productCheckResult.msg)
    }
  }
  checkProduct(product) {
    var status = 1
    var msg = ''
    for (const key in product) {
      if (product.hasOwnProperty(key)) {
        const element = product[key];
        if (element === '') {
          status = 0;
          msg = key + ',参数不能为空!'
          break;
        } 
      }
    }
    return {status,msg }
  }
  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="新增" />
        <div className="form-horizontal">
          <div className="form-group">
            <label className="col-md-2 control-label">商品名称</label>
            <div className="col-md-5">
              <input
                type="text"
                className="form-control"
                placeholder="请输入商品名称"
                name="name"
                value={this.state.name}
                onChange={e => this.onValueChange(e)}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品描述</label>
            <div className="col-md-5">
              <input
                type="text"
                className="form-control"
                placeholder="请输入商品描述"
                name="subtitle"
                value={this.state.subtitle}
                onChange={e => this.onValueChange(e)}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">所属分类</label>
            <CategorySelector
              onCategoryChange={(categoryId, parentCategoryId) =>
                this.onCategoryChange(categoryId, parentCategoryId)
              }
            />
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品价格</label>
            <div className="col-md-3">
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  placeholder="价格"
                  name="price"
                  value={this.state.price}
                  onChange={e => this.onValueChange(e)}
                />
                <span className="input-group-addon">元</span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品库存</label>
            <div className="col-md-3">
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  placeholder="库存"
                  name="stock"
                  value={this.state.stock}
                  onChange={e => this.onValueChange(e)}
                />
                <span className="input-group-addon">件</span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品图片</label>
            <div className="col-md-3">
              <Avatar onImgChange={subImage => this.onImgChange(subImage)} />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品详情</label>
            <div className="col-md-10"> 
              <BraftEditor
                value={this.state.editorState}
                onChange={editorState => this.handleEditorChange(editorState)}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-md-10">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={e => {
                  this.onSubmit(e);
                }}
              >
                提交
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ProductSave;
