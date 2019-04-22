import React from "react";
import { Layout, Breadcrumb } from "antd";
import NavSide from "../nav-side/index.jsx";
import NavTop from "../nav-top/index.jsx";
const { Header, Sider, Content } = Layout;
import "./index.scss";
class Layout1 extends React.Component {
  
  render() {
    return (
      <div id="wrapper">
        <Layout>
          <Header>
            <div className="logo">logo</div>
            <NavTop />
          </Header>
          <Layout>
            <Sider width={256} style={{ background: "#fff" }}>
              <NavSide />
            </Sider>
            <Layout style={{ padding: "0 24px 24px" }}>
              <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb>
              <Content
                style={{
                  background: "#fff",
                  padding: 24,
                  margin: 0,
                  minHeight: 280
                }}
              >
              {this.props.children}
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default Layout1;
