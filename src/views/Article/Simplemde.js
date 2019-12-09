import React, { Component } from 'react';
import { connect } from 'react-redux';
import SimpleMDE from 'simplemde';
// 如果其他页面需要解析markdown展示需要用到的插件，
// 目前在这里是前台展示，并没用到
// import marked from 'marked';
// import xss from 'xss';
// import hljs from 'highlight.js';
import 'simplemde/dist/simplemde.min.css';
import { Form, Input, Select, Upload, Icon, Button, Switch } from 'antd';
import './simplemde.less';
import {
  addArticleAction,
  updateArticleAction,
  getArticleDetail
} from '../../actions/articleAction';
import { $http } from '../../service/http';
// 此页面待优化：
// 1.处理上传图片组件的方法，markdown组件可以单独抽离出来，以便复用
// 2.后续可以实现一个markdown、富文本切换
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
// 如果是拖拽上传的话，此方法需要用到
// 监听window的拖拽事件，阻止默认行为
// window.addEventListener(
//   'drop',
//   e => {
//     if (e.target.className === 'CodeMirror-scroll') {
//       // 如果进入到编辑器的话，将阻止默认事件
//       e.preventDefault();
//     }
//   },
//   false
// );

const mapState = state => ({});
@connect(mapState, { addArticleAction, updateArticleAction, getArticleDetail })
@Form.create()
class ArticleEdit extends Component {
  constructor(props) {
    super(props);
    this.editor = React.createRef();
    this.upInput = React.createRef();
    this.state = {
      fileList: [],
      categoryList: [],
      value: '', // markdown内容
      author: '',
      desc: '',
      title: '',
      privates: true
    };
  }
  // 通过formData处理上传图片
  handleUpload = () => {
    let { fileList } = this.state;
    if (fileList.length > 0) {
      let formData = new FormData();
      fileList.forEach(file => {
        formData.append('image', file);
      });
      this.setState({
        uploading: true
      });
      return formData;
    }
    return '';
  };
  // 表单提交
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        let category_name = this.state.categoryList.find(
          item => item.id === values.category_id
        ).category_name;
        const formData = this.handleUpload();
        // if (this.allContent) {
        if (this.props.history.location.state) {
          let params = {
            title: values.title,
            desc: values.desc,
            content: this.smde.value(),
            // id: this.allContent.id, // 编辑需要传递id
            id: this.props.history.location.state.articleId, // 编辑需要传递id
            category_name,
            category_id: values.category_id,
            articlePic: formData,
            author: values.author,
            privates: this.state.privates
          };
          await this.props.updateArticleAction(params);
          this.setState({
            fileList: []
          });
        } else {
          let params = {
            title: values.title,
            desc: values.desc,
            content: this.smde.value(),
            category_name,
            category_id: values.category_id,
            articlePic: formData,
            author: values.author,
            privates: this.state.privates
          };
          await this.props.addArticleAction(params);
          this.setState({
            fileList: []
          });
        }
        this.props.history.push('/admin/article/articlelist');
      }
    });
  };
  // 该方法为解析markdown语法，结合highlight优化显示内容
  // 如果其他页面需要解析markdown展示需要用到的插件，
  // 目前在这里是前台展示，并没用到
  // ranslateMarkdown = (plainText, isGuardXss = false) => {
  //   return marked(isGuardXss ? xss(plainText) : plainText, {
  //     renderer: new marked.Renderer(),
  //     gfm: true,
  //     pedantic: false,
  //     sanitize: false,
  //     tables: true,
  //     breaks: true,
  //     smartLists: true,
  //     smartypants: true,
  //     highlight: function(code) {
  //       return hljs.highlightAuto(code).value;
  //     }
  //   });
  // };
  // hash模式传值没问题，history需要像didmount中那样做
  // componentWillMount() {
  //   // 此处为判断编辑or添加
  //   if (this.props.history.location.state) {
  //     // const { record } = this.props.history.location.state;
  //     // this.isUpdate = !!record;
  //     // this.allContent = record || {};
  //     // // 如果有值为编辑，把列表页通过路由state传递过来的值赋给markdown的内容
  //     // this.setState({
  //     //   value: this.allContent
  //     //     ? this.allContent.content.props.dangerouslySetInnerHTML.__html
  //     //     : ''
  //     // });
  //   }
  // }
  componentDidMount() {
    // hash模式传值没问题，history需要像didmount中这样做
    if (this.props.history.location.state) {
      let params = {
        article_id: this.props.history.location.state.articleId
      };
      this.props.getArticleDetail(params).then(res => {
        this.smde.value(res.data.article.content);
        this.setState({
          title: res.data.article.title,
          desc: res.data.article.desc,
          author: res.data.article.author,
          privates: res.data.article.privates
        });
      });
    }
    // 初始化markdown编辑器
    this.smde = new SimpleMDE({
      element: document.getElementById('editor').childElementCount,
      autofocus: true,
      // autoDownloadFontAwesome: false,
      forceSync: true,
      autosave: true,
      showIcons: ['code', 'table'],
      previewRender: this.translateMarkdown
    });
    // 监听markdown的change时间，存储其内容
    this.smde.codemirror.on('change', () => {
      this.content = this.smde.value();
    });
    // 获取input上传标签，用于图片上传
    var input = this.upInput.current;
    input.addEventListener('change', () => {
      var formData = new FormData();
      formData.append('image', input.files[0]);
      // 此处文件类型可以不用设置，浏览器会自动识别，待优化
      var config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
      $http
        .post('http://localhost:5001/api/v1/upload', formData, config)
        // .post('http://39.105.218.164:5001/api/v1/upload', formData, config)
        .then(res => {
          // ![](http://) 参照该格式用于显示markdown预览图片
          var urlname = `![](${res.url})`;
          this.smde.value(`${this.content ? this.content : ''}\n${urlname}\n`);
        });
    });
    // 获取分类列表
    $http.get('/api/v1/admin/category/all').then(res => {
      this.setState({
        categoryList: res.data
      });
    });
  }
  togglePrivate = (checked, event) => {
    this.setState({
      privates: !this.state.privates
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { fileList, title, author, desc, privates } = this.state;
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
        {/* 修改SimpleMDE编辑器的源码覆盖其自身方法，并创建一个隐藏的input标签用于调用上传弹框 */}
        <input
          style={{ display: 'none' }}
          accept="image/gif,image/jpeg,image/jpg,image/png"
          type="file"
          id="upInput"
          ref={this.upInput}
        ></input>
        <Form
          onSubmit={this.handleSubmit}
          className="article-edit-form"
          {...formItemLayout}
        >
          <Form.Item label="文章标题" className="edit-form-item">
            {getFieldDecorator('title', {
              // initialValue: this.allContent ? this.allContent.title : '',
              initialValue: title,
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
              // initialValue: this.allContent ? this.allContent.desc : '',
              initialValue: desc,
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
            {getFieldDecorator('category_id', {
              rules: [{ required: true }]
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
          <Form.Item label="作者" className="edit-form-item">
            {getFieldDecorator('author', {
              // initialValue: this.allContent ? this.allContent.author : '',
              initialValue: author,
              rules: [{ required: true, message: '请填写作者!' }]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="请填写作者"
              />
            )}
          </Form.Item>
          <Form.Item label="上传图片" extra="">
            <Upload {...props}>
              <Button>
                <Icon type="upload" /> 上传图片
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item label="私密" className="edit-form-item">
            {getFieldDecorator('privates', {
              // initialValue: this.allContent ? this.allContent.author : '',
              initialValue: privates
              // rules: [{ required: true, message: '请填写作者!' }]
            })(
              <Switch
                checkedChildren={<Icon type="check" />}
                unCheckedChildren={<Icon type="close" />}
                checked={this.state.privates}
                onClick={(checked, event) => this.togglePrivate(checked, event)}
              />
            )}
          </Form.Item>
          <h3 className="article-edit-title">文章内容</h3>
          {/* markdown编辑器容器 */}
          <textarea id="editor" defaultValue={this.state.value} />
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              {/* {this.allContent ? '修改' : '添加'} */}
              {this.props.history.location.state ? '修改' : '添加'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default ArticleEdit;
