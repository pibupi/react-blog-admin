import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { PubHeader, PubFooter, PubSideBar } from "../../components";
import "./home.less";
import { Layout } from "antd";
import { startLogin } from "../../actions/userAction";
const { Header, Content, Footer, Sider } = Layout;

const mapState = state => ({
  isLogin: state.user.isLogin
});
@connect(mapState, { startLogin })
class Home extends Component {
  render() {
    const { isLogin } = this.props;
    if (!isLogin) {
      return <Redirect to="/login" />;
    }
    return (
      <Layout style={{ minHeight: "100%" }}>
        <Header style={{ backgroundColor: "#eee" }}>
          <PubHeader />
        </Header>
        <Layout>
          <Sider style={{ color: "#fff" }}>
            <PubSideBar />
          </Sider>
          <Content>{this.props.children}</Content>
        </Layout>
        <Footer>
          <PubFooter />
        </Footer>
      </Layout>
    );
  }
}

export default Home;
