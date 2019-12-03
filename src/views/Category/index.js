import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Input, Modal, Form, Icon, message,Breadcrumb } from 'antd';
import {
  getCategoryListAction,
  deleteCategoryAction,
  addCategoryAction,
  updateCategoryAction
} from '../../actions/categoryAction';
import './category.less';

const { Search } = Input;

const mapState = state => ({
  categoryList: state.category.categoryList,
  count: state.category.count,
  auth: state.user.auth
});
@Form.create()
@connect(mapState, {
  getCategoryListAction,
  deleteCategoryAction,
  addCategoryAction,
  updateCategoryAction
})
class Category extends Component {
  constructor() {
    super();
    this.state = {
      offset: 1,
      visible: false,
      limited: 5,
      category_name: '',
      categoryId: null,
      form: 'edit', // 编辑or添加标志
      columns: [
        {
          title: '序号',
          width: '10%',
          render: (text, record, index) => `${index + 1}`,
          key: 'id'
        },
        {
          title: '分类名称',
          dataIndex: 'category_name'
        },
        {
          title: '创建时间',
          dataIndex: 'createdAt'
        },
        {
          title: '更新时间',
          dataIndex: 'updatedAt'
        },
        {
          title: '操作',
          key: 'action',
          width: 180,
          render: (text, record) => (
            <span>
              <Button type="primary" onClick={() => this.editCategory(record)}>
                编辑
              </Button>
              <Button
                type="danger"
                style={{ marginLeft: 10 }}
                onClick={() => this.deleteCategoryAction(record.id)}
              >
                删除
              </Button>
            </span>
          )
        }
      ]
    };
  }
  // 分类编辑
  editCategory = record => {
    if(this.props.auth === '2'){
      message.warning('权限不足')
      return
    }
    this.props.form.resetFields();
    this.setState({
      visible: true,
      category_name: record.category_name,
      form: 'edit',
      categoryId: record.id
    });
  };
  // 表单提交
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        if (this.state.form === 'add') {
          let { code, msg } = await this.props.addCategoryAction(values);
          if (code === 0) {
            message.success(msg);
          } else if (code === 1) {
            message.warning(msg);
            return;
          }
        } else if (this.state.form === 'edit') {
          let params = {
            categoryId: this.state.categoryId,
            ...values
          };
          let { code, msg } = await this.props.updateCategoryAction(params);
          if (code === 0) {
            message.success(msg);
          }
        }
        this.props.form.resetFields();
        this.setState({
          visible: false
        });
        this.props.getCategoryListAction(this.state.offset, this.state.limited);
      }
    });
  };
  // 取消
  handleCancel = e => {
    this.setState({
      visible: false,
      category_name: ''
    });
  };
  // 添加
  addCategoryBtn = () => {
    if(this.props.auth === '2'){
      message.warning('权限不足')
      return
    }
    this.setState({
      visible: true,
      form: 'add',
      category_name: ''
    });
  };
  // 删除
  deleteCategoryAction = async id => {
    if(this.props.auth === '2'){
      message.warning('权限不足')
      return
    }
    let { code, msg } = await this.props.deleteCategoryAction(id);
    if (code === 0) {
      message.success(msg);
      this.props.getCategoryListAction(this.state.offset, this.state.limited);
    }
  };
  // 搜索
  searchCategoryList = value => {
    this.setState(
      {
        offset: 1,
        limited: 5
      },
      () => {
        this.props.getCategoryListAction(
          this.state.offset,
          this.state.limited,
          value
        );
      }
    );
  };
  // 点击分页
  onPageChange = (page, pageSize) => {
    this.setState(
      {
        offset: page,
        limited: pageSize
      },
      () => {
        this.props.getCategoryListAction(this.state.offset, this.state.limited);
      }
    );
  };
  componentDidMount() {
    this.props.getCategoryListAction(this.state.offset, this.state.limited);
  }
  render() {
    const { categoryList, count } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="category-list-wrap">
         <Breadcrumb separator="//">
          <Breadcrumb.Item href="/admin">Home</Breadcrumb.Item>
          <Breadcrumb.Item >文章管理</Breadcrumb.Item>
          <Breadcrumb.Item href="/admin/category/categoryList">分类管理</Breadcrumb.Item>
        </Breadcrumb>
        <div className="category-list-header">
          <Search
            className="category-list-search"
            placeholder="输入搜索条件"
            enterButton
            onSearch={value => this.searchCategoryList(value)}
          />
          <Button type="primary" onClick={this.addCategoryBtn}>
            添加分类
          </Button>
        </div>
        <div className="category-list">
          <Table
            bordered
            columns={this.state.columns}
            rowKey="id"
            dataSource={categoryList}
            style={{ backgroundColor: '#fefefe' }}
            pagination={{
              defaultCurrent: 1,
              count: count,
              pageSize: this.state.limited,
              onChange: this.onPageChange
            }}
          />
        </div>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          footer={null}
          style={{ overflow: 'hidden' }}
        >
          <Form
            onSubmit={this.handleSubmit}
            className="article-edit-form"
            style={{ overflow: 'hidden' }}
          >
            <Form.Item label="分类名称" className="edit-form-item">
              {getFieldDecorator('category_name', {
                initialValue: this.state.category_name,
                rules: [{ required: true, message: '请输入分类名称!' }]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="分类名称"
                />
              )}
            </Form.Item>
            <Form.Item style={{ float: 'right' }}>
              <Button
                type="warn"
                style={{ marginRight: '10px' }}
                onClick={this.handleCancel}
              >
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                确定
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Category;
