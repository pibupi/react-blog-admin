import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { startLoginAction } from '../../actions/userAction';
import './login.less';

const mapState = state => ({
  isLogin: state.user.isLogin
});
@connect(mapState, { startLoginAction })
@Form.create()
class Login extends Component {
  constructor() {
    super();
    this.state = {
      rememberStatus: true // 是否自动登录
    };
  }
  // 表单提交===登录
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.startLoginAction(values);
      }
    });
  };
  // 跳转到注册页
  // toRegist = () => {
  //   this.props.history.push('/register');
  // };
  // 自动登录checkbox
  onChange = e => {
    this.setState({
      rememberStatus: e.target.checked
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { isLogin } = this.props;
    // 登录成功才可以进入首页
    if (isLogin) {
      return <Redirect to="/admin" />;
    }
    return (
      <div className="login-page">
        <div className="login-wrap">
          {/* <p className="login-title">账户密码登录</p> */}
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入用户名' }]
              })(
                <Input
                  style={{ width: '87%', height: '40px' }}
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="用户名"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: '请输入密码' },
                  { min: 6, max: 12, message: '长度为6-12' }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  style={{ width: '87%', height: '40px' }}
                  placeholder="密码"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: this.state.rememberStatus
              })(<Checkbox onChange={this.onChange}>自动登录</Checkbox>)}
              <div>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  size="large"
                >
                  登录
                </Button>
                {/* <Button type="primary" onClick={this.toRegist}>
                  注册
                </Button> */}
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;
