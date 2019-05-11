import React from "react";
import { Link } from "react-router-dom";
import PageTitle from "component/page-title/index";
import { Table} from "antd";
import {getOrderList} from "service/order";
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
        orderNo: ""
      },
      loading: false,
      title: '订单列表'
    };
  }
  componentDidMount() {
    this.getList();
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
    let res = await getOrderList(params);
    this.setState({ loading: false });
    if (res && res.status === STATUS_OK) {
      this.setState({ list: res.data.list });
      this.setState({ total: res.data.total });
    }
  }
  onSearch(orderNo) {
    this.setState({
      params: {
        orderNo: orderNo,
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
        title: "订单号",
        dataIndex: "orderNo",
        key: "orderNo",
        render: v => {
          return (
            <div>
              <Link style={{ marginRight: "5px" }} to={`/order/detail/${v}`}>
                {v}
              </Link>
            </div>
          );
        }
      },
      {
        title: "收件人",
        dataIndex: "receiverName",
        key: "receiverName",
      },
      {
        title: "订单状态",
        dataIndex: "statusDesc",
        key: "statusDesc"
      },
      {
        title: "价格",
        dataIndex: "orderItemVoList",
        key: "orderItemVoList",
        render: v => {
          var price = 0
          v.map((item) => {
            price += item.totalPrice || 0
          })
          return `¥ ${price}`;
        }
      },
      {
        title: "创建时间",
        dataIndex: "createTime",
        key: "createTime"
      },
      {
        title: "操作",
        dataIndex: "orderNo",
        key: "detailID",
        render: v => {
          return (
            <div>
              <Link style={{ marginRight: "5px" }} to={`/order/detail/${v}`}>
                查看
              </Link>
            </div>
          );
        }
      }
    ];
    return (
      <div>
        <PageTitle title={this.state.title}> 
        </PageTitle>
        {/* <ListSearch onSearch={(orderNo) => {this.onSearch(orderNo)}}></ListSearch> */}
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
