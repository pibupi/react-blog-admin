import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { userRegist } from '../../actions/userAction';
import './regis.less';

const mapState = state => ({
  msg: state.user.msg,
  redirectTo: state.user.redirectTo
});
@connect(
  mapState,
  { userRegist }
)
@Form.create()
class Register extends Component {
  userRegest = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.userRegist(values);
      }
    });
  };
  handleGoLogin = () => {
    console.log(this);
    this.props.history.push('/login');
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { msg, redirectTo } = this.props;
    if (redirectTo) {
      return <Redirect to={redirectTo} />;
    }
    return (
      <div className="login-page">
        <div className="login-wrap">
          <p className="login-title">注册</p>
          <p style={{ height: '20px' }}>
            {msg ? <div className="err-msg">{msg}</div> : null}
          </p>
          <Form className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '用户名' }]
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
              {getFieldDecorator('displayName', {
                rules: [{ required: true, message: '昵称' }]
              })(
                <Input
                  style={{ width: '87%', height: '40px' }}
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="昵称"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: '密码' },
                  { min: 6, max: 12, message: '长度为6-12' }
                ]
              })(
                <Input
                  style={{ width: '87%', height: '40px' }}
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="密码"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('pwdConfirm', {
                rules: [
                  { required: true, message: '确认密码' },
                  { min: 6, max: 12, message: '长度为6-12' }
                ]
              })(
                <Input
                  style={{ width: '87%', height: '40px' }}
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="确认密码"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                onClick={this.userRegest}
                className="login-form-button"
              >
                注册
              </Button>
              <Button onClick={this.handleGoLogin} type="primary">
                已有账号，去登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default Register;
