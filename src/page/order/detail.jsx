import React from "react";
import PageTitle from "component/page-title/index";
import {getOrderInfo} from 'service/order'
import { Table} from "antd";

class OrderDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.pid || 0,
      orderNo: "",
      createTime: "",
      orderItemVoList: [],
      shippingVo: {},
      paymentTypeDesc: "",
      detail: "",
      status: 1 //商品状态1为在售
    };
  }
  componentDidMount() {
    if (this.state.id > 0) {
      this.getProductDetail()
    }
  }
  
  async getProductDetail() {
    let res = await getOrderInfo({orderNo: this.state.id});
    if (res.status === 0) {
      let data = res.data
      this.setState(data);
    }
  }
  getPrice() {
    var price = 0;
    this.state.orderItemVoList.map((item) => {
      price += item.totalPrice || 0
    })
    return price
  }
  getAddr() {
    var addr = [];
    let orderList = [
      'receiverName',
      'receiverProvince',
      'receiverProvince',
      'receiverCity',
      'receiverDistrict',
      'receiverAddress',
      'receiverMobile'
    ]
    orderList.map((key) => {
      if (this.state.shippingVo[key]) {
        addr.push(this.state.shippingVo[key])
      }
    })
    return addr.join(',')
  }
  render() {
    let columns = [
      {
        title: "商品图片",
        dataIndex: "productImage",
        key: "productImage",
        render: v => {
          return (
            <img src={this.state.imageHost + v} width='80px' alt=""/>
          );
        }
      },
      {
        title: "商品信息",
        dataIndex: "productName",
        key: "productName",
      },
      {
        title: "单价",
        dataIndex: "currentUnitPrice",
        key: "currentUnitPrice"
      },
      {
        title: "数量",
        dataIndex: "quantity",
        key: "quantity"
      },
      {
        title: "合计",
        dataIndex: "totalPrice",
        key: "totalPrice"
      }
    ];
    return (
      <div id="page-wrapper">
        <PageTitle title="订单详情" />
        <div className="form-horizontal">
          <div className="form-group">
            <label className="col-md-2 control-label">订单号</label>
            <div className="col-md-5">
              <p
                className="form-control"
                >
                {this.state.orderNo}
              </p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">创建时间</label>
            <div className="col-md-5">
              <p
                className="form-control"
                >
                {this.state.createTime}
              </p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">收件人</label>
            <div className="col-md-5">
              <p
                className="form-control"
                >
                {this.getAddr()}
              </p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">订单状态</label>
            <div className="col-md-5">
              <p
                className="form-control"
                >
                {this.state.statusDesc}
              </p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">支付方式</label>
            <div className="col-md-5">
              <p
                className="form-control"
                >
                {this.state.paymentTypeDesc}
              </p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">金额</label>
            <div className="col-md-5">
              <p
                className="form-control"
                >
                {this.getPrice()}
              </p>
            </div>
          </div>
        </div>
        <Table
          rowKey={(record, index) => `complete${record.productId}${index}`}
          columns={columns}
          dataSource={this.state.orderItemVoList}
        />
      </div>
    );
  }
}
export default OrderDetail;
