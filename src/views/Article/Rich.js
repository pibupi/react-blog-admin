import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Select, Upload, Icon, Button } from 'antd';
import RichTextEdit from './Rich-text-edit';
import { addArticle, updateArticle } from '../../actions/articleAction';
import { $http } from '../../service/http';
import './edit.less';
// 此页面待优化：
// 1.处理上传图片组件的方法可以单独抽离出来，以便复用
const { Option } = Select;
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
@connect(mapState, { addArticle, updateArticle })
@Form.create()
class ArticleEdit extends Component {
  constructor(props) {
    super(props);
    this.editor = React.createRef();
    this.state = {
      fileList: [], // 上传图片
      categoryList: [] // 分类列表，可以放到redux统一管理
    };
  }
  // 通过formData处理上传图片
  handleUpload = () => {
    let { fileList } = this.state;
    let formData = new FormData();
    fileList.forEach(file => {
      formData.append('image', file);
    });
    return formData;
  };
  // 表单提交
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        // 获取经过formData处理过后的上传图片内容
        const formData = this.handleUpload();
        // 由此来判断添加or编辑
        if (this.allContent) {
          // 通过触发子组件的方法获取富文本内容
          const detail = await this.editor.current.getDetail();
          let params = {
            title: values.title,
            desc: values.desc,
            content: detail,
            id: this.allContent.id, // 编辑需要传递id
            categoryId: values.categoryId,
            articlePic: formData
          };
          await this.props.updateArticle(params);
          this.setState({
            fileList: [] // 上传图片清空操作
          });
        } else {
          // 添加
          const detail = await this.editor.current.getDetail();
          let params = {
            title: values.title,
            desc: values.desc,
            content: detail,
            categoryId: values.categoryId,
            articlePic: formData
          };
          await this.props.addArticle(params);
          this.setState({
            fileList: [] // 上传图片清空操作
          });
        }
        this.props.history.push('/admin/article/articlelist');
      }
    });
  };
  componentWillMount() {
    // 取到列表页传递的当前行数据并据此来判断编辑or添加
    if (this.props.history.location.state) {
      const { record } = this.props.history.location.state;
      this.isUpdate = !!record;
      this.allContent = record || {};
    }
  }
  componentDidMount() {
    // 获取所有分类，后续可以存储到redux中
    $http.get('/api/v1/category/all').then(res => {
      this.setState({
        categoryList: res.data
      });
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { fileList } = this.state;
    // 定义上传组件的相关配置
    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList
          };
        });
      },
      // 改方法用于实现手动上传
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file]
        }));
        return false;
      },
      fileList
    };
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
          <Form.Item label="文章分类">
            {getFieldDecorator('categoryId', {
              rules: [{ required: true, message: '请选择分类!' }]
            })(
              <Select placeholder="请选择分类">
                {this.state.categoryList.map(item => {
                  return (
                    <Option value={item.id} key={item.id}>
                      {item.category_name}
                    </Option>
                  );
                })}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="上传图片" extra="">
            <Upload {...props}>
              <Button>
                <Icon type="upload" /> Select File
              </Button>
            </Upload>
          </Form.Item>
          <h3 className="article-edit-title">文章内容</h3>
          <RichTextEdit
            className="article-edit-text"
            ref={this.editor}
            detail={this.allContent ? this.allContent.content : ''}
          />
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
