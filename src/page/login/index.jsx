import React from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import "./index.scss";
import { login } from "service/user.jsx";
import { type, errorTips } from "util/common.js";
import { setLocal } from "util/common.js";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
      // redirect:
    };
  }
  checkLoginInfo(loginInfo) {
    let username = loginInfo.username.trim();
    let password = loginInfo.password.trim();
    if (type(username) !== "string" || username.length === 0) {
      return {
        status: false,
        msg: "用户名不能为空"
      };
    }
    if (type(password) !== "string" || password.length === 0) {
      return {
        status: false,
        msg: "密码不能为空"
      };
    }
    return {
      status: true,
      msg: "验证通过"
    };
  }
  componentWillMount() {
    document.title = "登录 - mmail admin";
  }
  onInputchange(e, key) {
    let value = e.target.value;
    let inputName = e.target.name;
    this.setState({
      [inputName]: value
    });
  }
  async submit(e) {
    var info = {
      username: this.state.username,
      password: this.state.password
    };
    let checkResult = this.checkLoginInfo(info);
    if (checkResult.status) {
      let res = await login(info);
      if (res.status === 0) {
        setLocal("userInfo", res.data);
        this.props.history.push("/");
      }
    } else {
      errorTips(checkResult.msg);
    }
  }
  render() {
    return (
      <div className="col-md-4 col-md-offset-4">
                <div className="panel panel-default login-panel">
                    <div className="panel-heading">欢迎登录 - MMALL管理系统</div>
                    <div className="panel-body">
                      <form action="javascript:;">
                        <div className="form-group">
                          <input
                            type="text"
                            name="username"
                            value={this.state.username}
                            onChange={e => this.onInputchange(e)}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={e => this.onInputchange(e)}
                          />
                        </div>
                        <button onClick={e => this.submit(e)}>登录</button>
                        <button>注册</button>
                      </form>
                    </div>
                </div>
            </div>
    )
  }
}
export default Login;
