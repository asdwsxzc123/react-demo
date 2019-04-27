import React from "react";
import { Link } from "react-router-dom";
import PageTitle from "component/page-title/index";
import { Table, Button, Modal, message, Tag } from "antd";
import { getProductList, setProductStatus } from "service/product";
import { STATUS_OK } from "util/global";
import { okTips } from "util/common";
import ListSearch from './index-list-search'
class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totol: 0,
      list: [],
      params: {
        pageSize: 10,
        pageNum: 1,
        productName: ""
      },
      loading: false
    };
  }
  componentDidMount() {
    this.getList();
  }
  onchangeStatus(e, productId, v) {
    let newStatus = v === 1 ? 2 : 1,
      confirmTips = v === 1 ? "确定要下架该商品?" : "确定要上架该商品?";
    Modal.confirm({
      title: "操作",
      content: confirmTips,
      onOk: () => {
        this.setStatus({
          productId: productId,
          status: newStatus
        });
      },
      okText: "确定",
      cancelText: "取消"
    });
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
    let res = await getProductList(params);
    this.setState({ loading: false });
    if (res && res.status === STATUS_OK) {
      this.setState({ list: res.data.list });
      this.setState({ total: res.data.total });
    }
  }
  onSearch(productName) {
    this.setState({
      params: {
        productName: productName,
        pageSize: this.state.params.pageSize,
        pageNum: this.state.params.pageNum
      }
    }, () => {
      this.getList()
    })
  }

  async setStatus(params) {
    let res = await setProductStatus(params);
    if (res.status === STATUS_OK) {
      okTips(res.data);
      this.getList();
    }
  }
  changePageNum(pageNum) {
    this.setState(
      {
        params: {
          pageSize: this.state.params.pageSize,
          pageNum: pageNum
        }
      },
      () => {
        this.getList();
      }
    );
  }
  onShowSizeChange(current, pageSize) {
    this.setState(
      {
        params: {
          pageSize: pageSize,
          pageNum: current
        }
      },
      () => {
        this.getList();
      }
    );
  }
  render() {
    let columns = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id"
      },
      {
        title: "商品名",
        dataIndex: "name",
        key: "name",
        width: "20%"
      },
      {
        title: "副标题",
        dataIndex: "subtitle",
        key: "subtitle"
      },
      {
        title: "状态",
        dataIndex: "status",
        key: "status",
        render: (v, row) => {
          return (
            <div>
              <Tag
                style={{ width: "50px", textAlign: "center" }}
                color={v === 1 ? "green" : ""}
              >
                {v === 1 ? "在售" : "已下架"}
              </Tag>
              <Button
                size="small"
                type={v === 1 ? "danger" : "primary"}
                onClick={e => this.onchangeStatus(e, row.id, v)}
              >
                {v !== 1 ? "上架" : "下架"}
              </Button>
            </div>
          );
        }
      },
      {
        title: "价格",
        dataIndex: "price",
        key: "price",
        render: v => {
          return `¥ ${v}`;
        }
      },
      {
        title: "操作",
        dataIndex: "id",
        key: "detailID",
        render: v => {
          return (
            <div>
              <Link style={{ marginRight: "5px" }} to={`/product/detail/${v}`}>
                查看
              </Link>
              <Link to={`/product/save/${v}`}>编辑</Link>
            </div>
          );
        }
      }
    ];
    return (
      <div>
        <PageTitle title="商品列表"> 
          <div className="page-header-right">
            <Link className="btn btn-primary" to="/product/save"><i className="fa fa-plus"></i> <span style={{color:'#fff'}}>添加商品</span></Link>
          </div>
        </PageTitle>
        <ListSearch onSearch={(productName) => {this.onSearch(productName)}}></ListSearch>
        <Table
          rowKey={(record, index) => `complete${record.id}${index}`}
          columns={columns}
          dataSource={this.state.list}
          loading={this.state.loading}
          pagination={{
            showSizeChanger: true,
            onShowSizeChange: (cur, size) => this.onShowSizeChange(cur, size),
            defaultCurrent: 1,
            showTotal: (total, range) => `总共 ${total} 条`,
            onChange: num => this.changePageNum(num),
            position: "bottom",
            total: this.state.total,
            showQuickJumper: true,
            pageSizeOptions: ["10", "20", "30", "50"]
          }}
        />
      </div>
    );
  }
}
export default ProductList;
