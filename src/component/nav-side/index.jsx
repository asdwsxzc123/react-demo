/*
* @Author: Rosen
* @Date:   2018-01-23 20:00:02
* @Last Modified by:   Rosen
* @Last Modified time: 2018-01-26 13:43:14
*/
import React                from 'react';
import { Link, NavLink }    from 'react-router-dom';
import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class NavSide extends React.Component {
    handleClick (e) {
      console.log('click ', e);
    }
  
    render() {
      return (
        <Menu
          onClick={this.handleClick}
          style={{ width: 256 }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
        >
        <Menu.Item key="1">
          <NavLink to="/"><i className="fa fa-home mr5"></i>首页</NavLink>
        </Menu.Item>
          <SubMenu key="sub2" title={<span><i className="fa fa-list mr5"></i><span>商品</span></span>}>
            <Menu.Item key="5">
              <NavLink to="/product">商品管理</NavLink>
            </Menu.Item>
            <Menu.Item key="6">
              <NavLink to="/product/category">品类管理</NavLink>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub4" title={<span><i className="fa fa-check-square-o mr5"></i><span>订单</span></span>}>
            <Menu.Item key="10">
            <NavLink to="/order">订单管理</NavLink>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub5" title={<span><i className="fa fa-user mr5"></i><span>用户</span></span>}>
            <Menu.Item key="10">
               <NavLink to="/user">用户管理</NavLink>
            </Menu.Item>
          </SubMenu>
        </Menu>
      );
    }
  }
export default NavSide;