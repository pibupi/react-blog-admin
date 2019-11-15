import React, { Component } from 'react';
import RichTextEdit from './Rich-text-edit';
import { connect } from 'react-redux';
import './edit.less';
import {
  Form,
  Input,
  // Select,
  Icon,
  Button
} from 'antd';
import { addArticleList, updateArticle } from '../../actions/articleAction';

// const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 2 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 5 }
  }
};
const mapState = state => ({});
@connect(mapState, { addArticleList, updateArticle })
@Form.create()
class ArticleEdit extends Component {
  constructor(props) {
    super(props);
    this.editor = React.createRef();
    this.state = {
      title: '',
      desc: '',
      detail: ''
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        if (this.allContent) {
          const detail = await this.editor.current.getDetail();
          let params = {
            title: values.title,
            desc: values.desc,
            content: detail,
            id: this.allContent.id
          };
          await this.props.updateArticle(params);
        } else {
          const detail = await this.editor.current.getDetail();
          let params = {
            title: values.title,
            desc: values.desc,
            content: detail
          };
          await this.props.addArticleList(params);
        }
        this.props.history.push('/admin/article/articlelist');
      }
    });
  };
  componentWillMount() {
    if (this.props.history.location.state) {
      const { record } = this.props.history.location.state;
      this.isUpdate = !!record;
      this.allContent = record || {};
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="article-edit-wrap">
        <Form
          onSubmit={this.handleSubmit}
          className="article-edit-form"
          {...formItemLayout}
        >
          <Form.Item label="文章标题" className="edit-form-item">
            {getFieldDecorator('title', {
              initialValue: this.allContent ? this.allContent.title : '',
              rules: [{ required: true, message: '请输入标题!' }]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="标题"
              />
            )}
          </Form.Item>
          <Form.Item label="文章描述" className="edit-form-item">
            {getFieldDecorator('desc', {
              initialValue: this.allContent ? this.allContent.desc : '',
              rules: [{ required: true, message: '请输入文章描述!' }]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="文章描述"
              />
            )}
          </Form.Item>
          {/* <Form.Item label="文章分类">
          {getFieldDecorator('categoryId', {
            rules: [{ required: true, message: '请选择文章分类!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="文章分类"
            />,
          )}
        </Form.Item> */}
          <h3 className="article-edit-title">文章内容</h3>
          <RichTextEdit
            className="article-edit-text"
            ref={this.editor}
            detail={this.allContent ? this.allContent.content : ''}
          />
          {/* </Form.Item> */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              {this.allContent ? '修改' : '添加'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default ArticleEdit;
