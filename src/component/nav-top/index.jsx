/*
* @Author: Rosen
* @Date:   2018-01-23 19:59:56
* @Last Modified by:   Rosen
* @Last Modified time: 2018-01-26 12:49:37
*/
import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import {getLocal, removeLocal} from 'util/common.js'
import './index.scss'
import {logout} from 'service/user'
const myLogout = async({ key }) => {
    let res = await logout()
    if (res.status === 0) {
        removeLocal('userInfo')
        window.location.href = '/login';
    }
};
const menu = (
    <Menu>
        <Menu.Item key="0" onClick={myLogout}>
            <span >退出登录</span>
        </Menu.Item>
    </Menu>  
)

class NavTop extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: getLocal('userInfo').username
        }
    }
    render(){
        return (
            <div className="top-button">
                <Dropdown overlay={menu} trigger={['click']}>
                    <a className="ant-dropdown-link" href="#" >
                        <i className="fa fa-user-o mr5"></i>
                        {
                            this.state.username 
                            ? <span>欢迎,{this.state.username}</span>
                            : <span>欢迎你</span>
                        }
                         <Icon type="down" />
                    </a>
                </Dropdown>
            </div>
        );
    }
}

export default NavTop;