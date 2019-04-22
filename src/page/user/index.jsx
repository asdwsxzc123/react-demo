import React from "react";
import PageTile from "component/page-title/index";
import { Table, Divider, Tag, Pagination } from "antd";
import { getUserList } from "service/user";
import {STATUS_OK} from 'util/global'
const columns = [
  {
    title: "用户名",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "邮箱",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "电话",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "更新时间",
    dataIndex: "updateTime",
    key: "updateTime",
    render: (v) => {
      return new Date(v).toLocaleString()
    }
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    key: "createTime",
    render: (v) => {
      return new Date(v).toLocaleString()
    }
  },
];

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totol: 0,
      list: [],
      params: {
        pageSize: 10,
        pageNum: 1
      },
      loading: false
    };
  }
  componentDidMount() {
    this.getList()
  }
  async getList() {
    this.setState({loading: true})
    let res = await getUserList(this.state.params);
    this.setState({loading: false})
    if (res && res.status === STATUS_OK) {
      this.setState({'list':res.data.list})
      this.setState({'total':res.data.total})
    }
  }
  changePageNum(pageNum) {
    this.setState({
      params: {
        pageSize: this.state.params.pageSize,
        pageNum: pageNum
      }
    }, ()=> {
      this.getList()
    })
  }
  onShowSizeChange(current, pageSize) {
    this.setState({
      params: {
        pageSize: pageSize,
        pageNum: current
      }
    }, ()=> {
      this.getList()
    })
  }
  render() {
    return (
      <div>
        <PageTile title="用户列表" />
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
export default User;
