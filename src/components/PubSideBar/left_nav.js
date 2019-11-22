import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu, Icon } from 'antd';
import { changeOpenKeysAction } from '../../actions/menuAction';

const { SubMenu } = Menu;

const mapState = state => ({
  menulist: state.menus.menulist,
  openKeys: state.menus.openKeys
});
@connect(mapState, { changeOpenKeysAction })
@withRouter
class LeftNav extends Component {
  // 递归生成菜单
  getMenuNodes = adminRoutes => {
    return adminRoutes.map(item => {
      if (!item.children) {
        return (
          <Menu.Item key={item.pathname}>
            <Link to={item.pathname}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        );
      } else {
        return (
          <SubMenu
            key={item.pathname}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes(item.children)}
          </SubMenu>
        );
      }
    });
  };
  // 展开项展开的方法
  onOpenChange = openKeys => {
    this.rootSubmenuKeys = this.props.menulist.map(item => {
      if (item.children) {
        return item.pathname;
      } else {
        return null;
      }
    });
    const latestOpenKey = openKeys.find(
      key => this.props.openKeys.indexOf(key) === -1
    );
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.props.changeOpenKeysAction(openKeys);
    } else {
      this.props.changeOpenKeysAction(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  // 展开项，待完善
  openSubMenu = () => {
    let arr = this.props.location.pathname.split('/');
    let arr1 = [];
    // 处理的粗糙，有待改善,3级路由展开两个父级菜单 如何实现？
    // 2级
    if (arr.length === 4) {
      for (let i = 0; i < arr.length - 1; i++) {
        arr1.push(arr[i]);
      }
    }
    // 3级
    if (arr.length === 5) {
      for (let i = 0; i < arr.length - 2; i++) {
        arr1.push(arr[i]);
      }
    }
    // 如何存两个数组
    this.onOpenChange([arr1.join('/')]);
  };
  componentWillMount() {
    this.menuNodes = this.getMenuNodes(this.props.menulist);
    // 有个问题，这里的路径只能判断到2级路由，待搞？
    this.openSubMenu();
  }
  render() {
    let selectKeys = this.props.location.pathname;
    return (
      <div style={{ width: 200 }}>
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[selectKeys]}
          // defaultOpenKeys={this.props.openKeys}
          openKeys={this.props.openKeys}
          onOpenChange={this.onOpenChange}
        >
          {this.menuNodes}
        </Menu>
      </div>
    );
  }
}

export default LeftNav;
