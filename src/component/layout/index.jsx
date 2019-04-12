import React from 'react';
import { Layout } from 'antd';
import NavSide from "../nav-side/index.jsx";
import NavTop from "../nav-top/index.jsx";
const {
  Header, Sider, Content,
} = Layout;

class Layout1 extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div id="wrapper">
                 <Layout>
                    <Sider width={256}>
                        <NavSide></NavSide>
                    </Sider>
                    <Layout>
                        <Header >
                            <NavTop></NavTop>
                        </Header>
                        <Content>
                            
                            {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
                
            </div>
        );
    }
}

export default Layout1;