import React, { Component } from 'react';
import { Form, Input, Icon } from 'antd';
@Form.create()
class UserForm extends Component {
  // 把值传递给父组件F
  componentWillMount() {
    this.props.getFormValue(this.props.form);
  }
  render() {
    const { userInfo } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 15 }
    };
    return (
      <Form className="login-form" {...formItemLayout}>
        <Form.Item label="用户名">
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '用户名' }],
            initialValue: userInfo.username
          })(
            <Input
              style={{ width: '87%', height: '40px' }}
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />
          )}
        </Form.Item>
        <Form.Item label="昵称">
          {getFieldDecorator('displayName', {
            rules: [{ required: true, message: '昵称' }],
            initialValue: userInfo.displayName
          })(
            <Input
              style={{ width: '87%', height: '40px' }}
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="昵称"
            />
          )}
        </Form.Item>
        <Form.Item label="邮箱">
          {getFieldDecorator('email', {
            rules: [{ required: true, message: '邮箱' }],
            initialValue: userInfo.email
          })(
            <Input
              style={{ width: '87%', height: '40px' }}
              prefix={
                <Icon type="email" style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              placeholder="邮箱"
            />
          )}
        </Form.Item>
        <Form.Item label="电话">
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: '电话' }],
            initialValue: userInfo.phone
          })(
            <Input
              style={{ width: '87%', height: '40px' }}
              prefix={
                <Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              placeholder="电话"
            />
          )}
        </Form.Item>
        {userInfo.id ? null : (
          <Form.Item label="密码">
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
        )}
        {userInfo.id ? null : (
          <Form.Item label="确认密码">
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
        )}
      </Form>
    );
  }
}

export default UserForm;
