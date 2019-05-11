import React from "react";
import PageTitle from "component/page-title/index";
import CategorySelector from "./category-selector";
import Avatar from "./upload";
import {errorTips,okTips} from 'util/common'
import {saveProduct, getProductInfo} from 'service/product'
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
  componentDidMount() {
    if (this.state.id > 0) {
      this.getProductDetail()
    }
  }
  
  async getProductDetail() {
    let res = await getProductInfo({productId: this.state.id});
    if (res.status === 0) {
      let data = res.data
      let imgs = data.subImages ? data.subImages.split(',') : [];
      data.subImages = imgs.map(img => {
        return {
          uri: img.uri,
          url: data.imageHost + img.uri
        }
      })
      this.setState(data);
      this.setState({
        editorState: BraftEditor.createEditorState(data.detail)
    })
    }
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
                readOnly
                type="text"
                className="form-control"
                placeholder="请输入商品名称"
                name="name"
                value={this.state.name}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品描述</label>
            <div className="col-md-5">
              <input
                readOnly
                type="text"
                className="form-control"
                placeholder="请输入商品描述"
                name="subtitle"
                value={this.state.subtitle}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">所属分类</label>
            <CategorySelector
              readOnly
              parentCategoryId={this.state.parentCategoryId}
              categoryId={this.state.categoryId}
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
                  readOnly
                  type="number"
                  className="form-control"
                  placeholder="价格"
                  name="price"
                  value={this.state.price}
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
                  readOnly
                  type="number"
                  className="form-control"
                  placeholder="库存"
                  name="stock"
                  value={this.state.stock}
                />
                <span className="input-group-addon">件</span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品图片</label>
            <div className="col-md-3">
              <Avatar 
                imgList={this.state.subImages}
                onImgChange={subImage => this.onImgChange(subImage)} 
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品详情</label>
            <div className="col-md-10"> 
              <BraftEditor
                readOnly
                value={this.state.editorState}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ProductSave;
