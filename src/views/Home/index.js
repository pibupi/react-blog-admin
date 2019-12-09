import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import { PubHeader, PubSideBar } from '../../components';
import './home.less';

const { Header, Content, Sider } = Layout;

const mapState = state => ({
  isLogin: state.user.isLogin
});
@connect(mapState)
class Home extends Component {
  render() {
    const { isLogin } = this.props;
    // 如果没登陆直接跳转到登录页
    if (!isLogin) {
      return <Redirect to="/login" />;
    }
    return (
      <Layout style={{ height: '100%' }}>
        <Header style={{ backgroundColor: '#eee' }}>
          <PubHeader />
        </Header>
        <Layout>
          <Sider style={{ color: '#fff' }}>
            <PubSideBar />
          </Sider>
          <Content>{this.props.children}</Content>
        </Layout>
        {/* <Footer>
          <PubFooter />
        </Footer> */}
      </Layout>
    );
  }
}

export default Home;
