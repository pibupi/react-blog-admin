import React, { Component } from 'react';
import RichTextEdit from './Rich-text-edit';
import { connect } from 'react-redux';
import './edit.less';
// import reqwest from 'reqwest';
import {
  Form,
  Input,
  Select,
  // message,
  Upload,
  Icon,
  Spin,
  Button
} from 'antd';
import { addArticleList, updateArticle } from '../../actions/articleAction';
import { localGettoken } from '../../utils/storage';
import {$http} from '../../service/http'
// const { Option } = Select;
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
@connect(mapState, { addArticleList, updateArticle })
@Form.create()
class ArticleEdit extends Component {
  constructor(props) {
    super(props);
    this.editor = React.createRef();
    this.state = {
      title: '',
      desc: '',
      detail: '',
      isUploading: false,
      url: '',
      fileList: [],
      uploading: false,
      categoryList:[]
    };
  }
  handleUpload = () => {
    let { fileList } = this.state;
    console.log(fileList);
    let formData = new FormData();
    fileList.forEach(file => {
      // console.log(file)
      formData.append('image', file);
      // console.log(formData)
    });
    console.log(formData);
    this.setState({
      uploading: true
    });
    return formData;
    // You can use any AJAX library you like
    // reqwest({
    //   url: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    //   method: 'post',
    //   processData: false,
    //   data: formData,
    //   success: () => {
    //     this.setState({
    //       fileList: [],
    //       uploading: false,
    //     });
    //     message.success('upload successfully.');
    //   },
    //   error: () => {
    //     this.setState({
    //       uploading: false,
    //     });
    //     message.error('upload failed.');
    //   },
    // });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      console.log(values);
      if (!err) {
        const formData = this.handleUpload();
        // console.log(fileList[0]['File'])
        // console.log(formData)
        if (this.allContent) {
          const detail = await this.editor.current.getDetail();
          let params = {
            title: values.title,
            desc: values.desc,
            content: detail,
            id: this.allContent.id,
            categoryId:values.categoryId,
            articlePic: formData
          };
          await this.props.updateArticle(params);
          this.setState({
            fileList: []
          });
        } else {
          const detail = await this.editor.current.getDetail();
          let params = {
            title: values.title,
            desc: values.desc,
            content: detail,
            categoryId:values.categoryId,
            articlePic: formData
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
  // handleUploadAvatar = ({ file }) => {
  //   console.log(file);
  //   return new Promise((resolve, reject) => {
  //     const xhr = new XMLHttpRequest();
  //     xhr.open('POST', 'http://localhost:5001/api/v1/upload/title'); // 后端上传图片的接口地址
  //     xhr.setRequestHeader('Authorization', 'Bearer ' + localGettoken('token'));
  //     const data = new FormData();
  //     console.log(file);
  //     data.append('image', file);
  //     console.log(data);
  //     xhr.send(data);
  //     xhr.addEventListener('load', () => {
  //       const response = JSON.parse(xhr.responseText);
  //       const url = response.url;
  //       // resolve({ data: { link: url } }); // 后端返回的url地址
  //       this.setState({
  //         url
  //       })
  //     });
  //     xhr.addEventListener('error', () => {
  //       const error = JSON.parse(xhr.responseText);
  //       reject(error);
  //     });
  //   });
  // };
  // normFile = e => {
  //   console.log('Upload event:', e);
  //   if (Array.isArray(e)) {
  //     return e;
  //   }
  //   return e && e.fileList;
  // };
  componentDidMount(){
    $http.get('/api/v1/category/all').then(res=>{
      this.setState({
        categoryList:res.data
      })
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { uploading, fileList } = this.state;
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
          <Form.Item label="文章分类" >
            {getFieldDecorator('categoryId', {
              rules: [
                { required: true, message: '请选择分类!' }
              ]
            })(
              <Select placeholder="请选择分类">
                {
                  this.state.categoryList.map(item=>{
                    return (
                    <Option value={item.id} key={item.id}>{item.category_name}</Option>
                    )
                  })
                }
              </Select>
            )}
          </Form.Item>
          <Form.Item label="上传图片" extra="">
            {/* {getFieldDecorator('upload', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile
            })(
              <Upload
                // name="avatar"
                style={{
                  border: '1px dashed #dedede',
                  width: 80,
                  height: 80,
                  display: 'block'
                }}
                showUploadList={false}
                customRequest={this.handleUploadAvatar}
              >
                <Spin spinning={this.state.isUploading}>
                  {this.state.url ? (
                    <img
                      style={{ width: 78, height: 78 }}
                      src={this.state.url}
                      alt="文章标题图片"
                    />
                  ) : (
                    <span>点击上传</span>
                  )}
                </Spin>
              </Upload>
            )} */}
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
