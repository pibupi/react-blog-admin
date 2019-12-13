import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu, Dropdown, Icon, Avatar, Badge } from 'antd';
import { logOutAction } from '../../actions/userAction';
import Logo from '../../assets/images/logo.png';
import './pubheader.less';

const mapState = state => ({
  displayName: state.user.displayName
});
@connect(mapState, {
  logOutAction
})
@withRouter
class Header extends Component {
  // 右侧下拉列表菜单点击的方法
  onClick = ({ key }) => {
    if (key === '/login') {
      this.props.logOutAction();
    }
    this.props.history.push(key);
  };
  // 右侧下拉列表
  renderDropdown = () => (
    <Menu onClick={this.onClick}>
      <Menu.Item key="/admin/notification">
        <Badge dot> 通知中心 </Badge>
      </Menu.Item>
      <Menu.Item key="/admin/settings/role"> 个人设置 </Menu.Item>
      <Menu.Item key="/login"> 退出登录 </Menu.Item>
    </Menu>
  );
  render() {
    const { displayName } = this.props;
    return (
      <>
        <div className="pub-header">
          <div className="pub-header-logo">
            <img src={Logo} alt="" height="50" />
          </div>
          <div className="pub-header-usersetting">
            <Dropdown overlay={this.renderDropdown} trigger={['click']}>
              <div>
                {/* <Avatar src="../../assets/images/github.png" /> */}
                {/* <img src="../../assets/images/github.png" alt="头像" /> */}
                <span className="welcome">
                  欢迎您！, <span> {displayName} </span>
                </span>
                <Badge count={5} offset={[5, -5]}>
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
