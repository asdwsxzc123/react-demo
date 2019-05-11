import React from "react";
import { Link } from "react-router-dom";
import PageTitle from "component/page-title/index";
import { Table } from "antd";
import { getCategoryList, setCategoryName, addCategoryName } from "service/product";
import { STATUS_OK } from "util/global";
import CategoryDlg from "./add";

class CategoryList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      loading: false,
      params: {
        pageSize: 10,
        pageNum: 1,
        categoryId: this.props.match.params.categoryId || 0,
      },
      categoryParams: {},
      visible: false
    }
  }
  componentDidMount() {
    this.getList();
  }
  componentDidUpdate(prevProps, prevState) {
    let oldPath = prevProps.location.pathname,
      newPath = this.props.location.pathname,
      newId = this.props.match.params.categoryId || 0;
    if (oldPath !== newPath) {
      let params = this.state.params;
      params.categoryId = newId;
      this.setState({ params },
        () => {
          this.getList()
      });
    }
  }
  async getList() {
    this.setState({ loading: true });
    let params = Object.assign({},this.state.params)
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const element = params[key];
        if (element === '') {
          delete params[key]
        }
      }
    }
    let res = await getCategoryList(params);
    this.setState({ loading: false });
    if (res && res.status === STATUS_OK) {
      this.setState({ list: res.data });
    }
  }
  onChangeCategory(e, categoryParams, isNew) {
    if (isNew) {
      categoryParams.isNew = true
    }
    this.setState({categoryParams},() => {
      this.onChangeVisible(true);
    })
  }
  onChangeVisible(visible) {
    this.setState({visible});
  }
  render() {
    let columns = [
      {
        title: "品类ID",
        dataIndex: "id",
        key: "id"
      },
      {
        title: "品类名称",
        dataIndex: "name",
        key: "name",
        width: "20%"
      },
      {
        title: "操作",
        dataIndex: "id",
        key: "detailID",
        render:( v, row) => {
          return (
            <div>
              <a href="javascript:;" 
              onClick={(e) => this.onChangeCategory(e, {
                categoryId: row.id,
                categoryName: row.name
              })} 
              className="mr5">修改名称</a>
              <Link style={{ marginRight: "5px" }} to={`/product/category/${v}`}>
                查看其子品类
              </Link>
            </div>
          );
        }
      }
    ];
    return (
      <div>
        <PageTitle title="品类管理">
          <div className="page-header-right">
            <a className="btn btn-primary" href="javascript:;" onClick={(e) => this.onChangeCategory(e,{
              categoryId: this.state.params.categoryId
            }, true)}>
              <i className="fa fa-plus"></i>
              <span style={{color:'#fff'}}>添加品类</span>
            </a>
          </div>
        </PageTitle>
        <p>
          当前商品分类ID: {this.state.params.categoryId}
        </p>
        <Table
          rowKey={(record, index) => `complete${record.id}${index}`}
          columns={columns}
          dataSource={this.state.list}
          loading={this.state.loading}
          pagination={{
            defaultCurrent: 1,
            showTotal: (total, range) => `总共 ${total} 条`,
            position: "bottom",
            total: this.state.total,
            showQuickJumper: true,
            pageSizeOptions: ["10", "20", "30", "50"]
          }}
        />
       <CategoryDlg 
       visible={this.state.visible}
       onChangeVisible={visible => this.onChangeVisible(visible)}
       categoryParams={this.state.categoryParams}
       getList={() => this.getList()}
       ></CategoryDlg>
      </div>
    )
  }

}

export default CategoryList