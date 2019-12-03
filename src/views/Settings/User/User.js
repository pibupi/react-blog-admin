import React, { Component } from 'react';
import { Button, Table, Modal, message, Breadcrumb } from 'antd';
import { connect } from 'react-redux';
import UserForm from './User-form';
import {
  userRegistAction,
  getUsers,
  deleteUserAction,
  userUpdateAction
} from '../../../actions/userAction';
import './user.less';
const mapState = state => ({
  msg: state.user.msg,
  auth:state.user.auth
});
@connect(mapState, {
  userRegistAction,
  getUsers,
  deleteUserAction,
  userUpdateAction
})
class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addModalStatus: false,
      offset: 1,
      limited: 5,
      count: null,
      userlist: [],
      status: 'add',
      userInfo: {},
      id: null
    };
  }
  initColumns = () => {
    this.columns = [
      {
        title: '用户名',
        dataIndex: 'username'
      },
      {
        title: '昵称',
        dataIndex: 'displayName'
      },
      {
        title: '邮箱',
        dataIndex: 'email'
      },
      {
        title: '电话',
        dataIndex: 'phone'
      },
      {
        title: '注册时间',
        dataIndex: 'createdAt'
        // render: formateDate
      },
      {
        title: '所属角色',
        dataIndex: 'role_id'
        // render: (role_id) => this.roleNames[role_id]
      },
      {
        title: '操作',
        width: 180,
        render: records => (
          <span>
            <Button type="primary" onClick={() => this.editUser(records)}>
              修改
            </Button>
            <Button
              type="danger"
              style={{ marginLeft: 10 }}
              onClick={() => this.deleteUser(records.id)}
            >
              删除
            </Button>
          </span>
        )
      }
    ];
  };
  // 编辑用户
  editUser = records => {
    if(this.props.auth === '2'){
      message.warning('权限不足')
      return
    }
    this.setState({
      status: 'edit',
      addModalStatus: true,
      userInfo: records,
      id: records.id
    });
  };
  // 删除用户
  deleteUser = async id => {
    if(this.props.auth === '2'){
      message.warning('权限不足')
      return
    }
    console.log(id);
    let { code, msg } = await this.props.deleteUserAction(id);
    if (code === 0) {
      message.success(msg);
      this.getUsers(this.state.offset, this.state.limited);
    }
  };
  showAddModal = () => {
    this.setState({
      addModalStatus: true,
      userInfo: {}
    });
  };
  // 创建/更新用户
  userAdd = () => {
    if(this.props.auth === '2'){
      message.warning('权限不足')
      return
    }
    if (this.state.status === 'add') {
      this.form.validateFields(async (err, values) => {
        if (!err) {
          await this.props.userRegistAction(values);
          this.setState(
            {
              addModalStatus: false
            },
            () => {
              this.getUsers(this.state.offset, this.state.limited);
            }
          );
          message.success(this.props.msg);
        }
      });
    } else {
      // 更新用户
      this.form.validateFields(async (err, values) => {
        if (!err) {
          let data = {
            ...values,
            id: this.state.id
          };
          let { code, msg } = await this.props.userUpdateAction(data);
          if (code === 0) {
            this.setState(
              {
                addModalStatus: false
              },
              () => {
                this.getUsers(this.state.offset, this.state.limited);
              }
            );
            message.success(msg);
          }
        }
      });
    }
  };
  // 获取用户列表
  getUsers = async () => {
    const { code, data, msg, count } = await this.props.getUsers(
      this.state.offset,
      this.state.limited
    );
    if (code === 0) {
      this.setState({
        userlist: data,
        count
      });
      message.success(msg);
    }
  };
  // 关闭模态框
  cancelModal = () => {
    this.form.resetFields();
    this.setState({
      addModalStatus: false
    });
  };
  // 分页
  onPageChange = (page, pageSize) => {
    this.setState(
      {
        offset: page,
        limited: pageSize
      },
      () => {
        this.getUsers(this.state.offset, this.state.limited);
      }
    );
  };
  componentWillMount() {
    this.initColumns();
  }
  componentDidMount() {
    this.getUsers();
  }
  render() {
    const { addModalStatus, userlist, count, status, userInfo } = this.state;
    // const title = (
    //   <Button type="primary" onClick={this.showAddModal}>
    //     创建用户
    //   </Button>
    // );
    return (
      <div className="user-list-wrap">
        <Breadcrumb separator="//">
          <Breadcrumb.Item href="/admin">Home</Breadcrumb.Item>
          <Breadcrumb.Item>设置</Breadcrumb.Item>
          <Breadcrumb.Item href="/admin/settings/user">
            用户管理
          </Breadcrumb.Item>
        </Breadcrumb>
        {/* <Card title={title}> */}
        <div className="user-add-btn">
          <Button type="primary" onClick={this.showAddModal}>
            创建用户
          </Button>
        </div>
        <Table
          bordered
          rowKey="id"
          dataSource={userlist}
          columns={this.columns}
          pagination={{
            defaultCurrent: 1,
            total: count,
            showTotal: count => `共 ${count} 条`,
            pageSize: this.state.limited,
            onChange: this.onPageChange
          }}
        />
        <Modal
          title={status === 'add' ? '创建' : '编辑'}
          visible={addModalStatus}
          onOk={this.userAdd}
          onCancel={this.cancelModal}
        >
          <UserForm
            getFormValue={form => (this.form = form)}
            userInfo={userInfo}
          />
        </Modal>
        {/* </Card> */}
      </div>
    );
  }
}

export default User;
