/*
* @Author: Rosen
* @Date:   2018-01-23 19:59:56
* @Last Modified by:   Rosen
* @Last Modified time: 2018-01-26 12:49:37
*/
import React        from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import './index.scss'
const menu = (
<Menu>
    <Menu.Item key="0">
    <a href="http://www.alipay.com/">1st menu item</a>
    </Menu.Item>
    <Menu.Item key="1">
    <a href="http://www.taobao.com/">2nd menu item</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">3rd menu item</Menu.Item>
</Menu>
);


class NavTop extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="top-button">
                <Dropdown overlay={menu} trigger={['click']}>
                    <a className="ant-dropdown-link" href="#">
                    <i className="fa fa-user-o mr5"></i>
                    Click me <Icon type="down" />
                    </a>
                </Dropdown>
            </div>
        );
    }
}

export default NavTop;