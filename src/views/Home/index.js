import React, { Component } from 'react';
import {
  PubHeader,
  PubFooter,
  PubSideBar
} from '../../components'
import './home.less'
import { Layout} from 'antd';
const { Header, Content, Footer, Sider } = Layout;

class Home extends Component {
  render() {
    return (      
      <Layout style={{minHeight: '100%'}}>
        <Header style={{backgroundColor:'#eee'}}>
          <PubHeader />
        </Header>
        <Layout>
          <Sider style={{color:'#fff'}}>
            <PubSideBar  />
          </Sider>
          <Content>
            {this.props.children}
          </Content>
        </Layout>
        <Footer>
          <PubFooter />
        </Footer>
      </Layout>
    );
  }
}

export default Home;