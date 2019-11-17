import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Input, Modal, Form, Icon } from 'antd';
import {
  getCategoryList,
  deleteCategory,
  addCategory,
  updateCategory
} from '../../actions/categoryAction';
import './category.less';
const { Search } = Input;

const mapState = state => ({
  categoryList: state.category.categoryList,
  total: state.category.total
});
@Form.create()
@connect(mapState, {
  getCategoryList,
  deleteCategory,
  addCategory,
  updateCategory
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
      form: 'edit',
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
                onClick={() => this.deleteCategory(record.id)}
              >
                删除
              </Button>
            </span>
          )
        }
      ]
    };
  }
  editCategory = record => {
    this.props.form.resetFields();
    this.setState({
      visible: true,
      category_name: record.category_name,
      form: 'edit',
      categoryId: record.id
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      console.log(values);
      if (!err) {
        if (this.state.form === 'add') {
          await this.props.addCategory(values);
        } else if (this.state.form === 'edit') {
          let params = {
            categoryId: this.state.categoryId,
            ...values
          };
          await this.props.updateCategory(params);
          // this.props.form.resetFields();
        }
        this.props.form.resetFields();
        this.setState({
          visible: false
        });
      }
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
      category_name: ''
    });
  };

  addCategoryBtn = () => {
    this.setState({
      visible: true,
      form: 'add',
      category_name: ''
    });
  };
  searchCategoryList = value => {
    this.setState(
      {
        offset: 1,
        limited: 5
      },
      () => {
        this.props.getArticleList(this.state.offset, this.state.limited, value);
      }
    );
  };
  deleteCategory = id => {
    this.props.deleteCategory(id);
  };
  onPageChange = (page, pageSize) => {
    this.setState(
      {
        offset: page,
        limited: pageSize
      },
      () => {
        this.props.getCategoryList(this.state.offset, this.state.limited);
      }
    );
  };
  componentDidMount() {
    this.props.getCategoryList(this.state.offset, this.state.limited);
  }
  render() {
    const { categoryList, total } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="category-list-wrap">
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
              total: total,
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
