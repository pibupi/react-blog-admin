import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {startLogin} from '../../actions/menuAction'
import './login.less'

const mapState = state => ({
  isLogin:state.user.isLogin
})
@connect(mapState,{startLogin})
@Form.create()
class Login extends Component {
  constructor(){
    super()
    this.state = {
      rememberStatus:true
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.startLogin(values)
      }
    });
    // CI/CD
  };
  onChange = e => {
    this.setState({
      rememberStatus:e.target.checked
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      this.props.isLogin ?
      <Redirect to="/admin" />
      :
      <div className="login-wrap">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入用户名' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="请输入用户名"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: '请输入密码' },
                { min:6,max:12, message: '长度为6-12' }
              ],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="请输入密码"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: this.state.rememberStatus,
            })(<Checkbox
              onChange={this.onChange}
            >记住密码</Checkbox>)}
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录  
            </Button>
            <Button type="primary">注册</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Login;