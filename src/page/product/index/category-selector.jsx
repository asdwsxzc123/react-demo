import React from "react";
import { getCategoryList } from "service/product";
import { type } from "util/common";
import "./category-selector.scss";
class CategorySelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstCategoryList: [],
      firstCategoryId: 0,
      secondCategoryList: [],
      secondCategoryId: 0
    };
  }
  componentDidMount() {
    this.loadFirstCategory();
  }
  componentWillReceiveProps(nextProps) {
    let categoryChang = nextProps.categoryId !== this.props.categoryId,
    parentCategoryChang = nextProps.parentCategoryId !== this.props.parentCategoryId
    // 数据没有发生变化的时候,直接不做处理
    if (!categoryChang && !parentCategoryChang) {
      return 
    }
    // 只有一级品类
    if(nextProps.parentCategoryId === 0) {
      this.setState({
        firstCategoryId: nextProps.categoryId,
        secondCategoryId: 0
      }, () => {
        this.loadSecondCategory()
      })
    } else {
      this.setState({
        firstCategoryId: nextProps.parentCategoryId,
        secondCategoryId: nextProps.categoryId
      }, () => {
        parentCategoryChang && this.loadSecondCategory()
      })
    }
  }
  async loadFirstCategory() {
    let res = await getCategoryList({ categoryId: 0 });
    if (res.status === 0) {
      this.setState({
        firstCategoryList: res.data
      });
    }
  }
  async loadSecondCategory() {
    let res = await getCategoryList({ categoryId: this.state.firstCategoryId });
    if (res.status === 0) {
      console.log(res);
      this.setState({
        secondCategoryList: res.data
      });
    }
  }
  // 选择一级分类
  onFirstCategoryChange(e) {
    if (this.props.readOnly) {
      return 
    }
    let newValue = e.target.value || 0;
    this.setState(
      {
        firstCategoryId: newValue,
        secondCategoryId: 0,
        secondCategoryList: []
      },
      () => {
        // 更新二级分类
        this.loadSecondCategory();
        this.onPropsCategoryChange();
      }
    );
  }
  // 选择二级分类
  onSecondCategoryChange(e) {
    if (this.props.readOnly) {
      return 
    }
    let newValue = e.target.value || 0;
    this.setState(
      {
        secondCategoryId: newValue
      },
      () => {
        // 更新二级分类
        this.onPropsCategoryChange();
      }
    );
  }
  // 返回结果
  onPropsCategoryChange() {
    let categoryChangeable = type(this.props.onCategoryChange) === "function";
    if (categoryChangeable) {
      this.props.onCategoryChange(
        this.state.secondCategoryId,
        this.state.firstCategoryId
      );
    }
  }
  render() {
    return (
      <div className="col-md-5">
        <select
          name=""
          className="form-control cate-select"
          value={this.state.firstCategoryId}
          readOnly= {this.props.readOnly}
          onChange={e => this.onFirstCategoryChange(e)}
        >
          <option value="">请选择一级分类</option>
          {this.state.firstCategoryList.map((category, index) => {
            return (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            );
          })}
        </select>
        {this.state.secondCategoryList.length > 0 ? (
          <select name="" className="form-control cate-select"
          value={this.state.secondCategoryId}
          readOnly= {this.props.readOnly}
          onChange={e => this.onSecondCategoryChange(e)}
          >
            <option value="">请选择二级分类</option>
            {this.state.secondCategoryList.map((category, index) => {
              return (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        ) : null}
      </div>
    );
  }
}
export default CategorySelector;
