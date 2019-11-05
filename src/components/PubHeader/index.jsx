import React, { Component } from 'react';
import { Menu, Dropdown, Icon ,Avatar,Badge } from 'antd';
import  {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {logOut} from '../../actions/menuAction'
import Logo from '../../assets/images/logo.png'
import './pubheader.less'

const mapState = state =>({})
@connect(mapState,{logOut})
@withRouter
class Header extends Component {
  onClick = ({ key }) => {
    if(key === '/login'){
      this.props.logOut()
    }
    this.props.history.push(key)
  };
  renderDropdown =() => (
    <Menu onClick={this.onClick}>
      <Menu.Item key="/admin/notification">
        <Badge dot>
          通知中心
        </Badge>
      </Menu.Item>
      <Menu.Item key="/admin/settings/role">
        个人设置
      </Menu.Item>
      <Menu.Item key="/login">退出登录</Menu.Item>
    </Menu>
  );
  render() {
    return (
      <>
        <div className="pub-header">
                <div className="pub-header-logo">
            <img src={Logo} alt="" height="50"/>
          </div>
          <div className="pub-header-usersetting">
            <Dropdown overlay={this.renderDropdown} trigger={['click']}>
              <div>
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                <span className="welcome">欢迎您！</span>
                <Badge count={5} offset={[5,-5]}>
                  <Icon type="down" />
                </Badge>
              </div>
            </Dropdown>
          </div>
        </div>
      </>
    );
  }
}

export default Header;