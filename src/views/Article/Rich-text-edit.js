import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { localGettoken } from '../../utils/storage';

class RichTextEdit extends Component {
  state = {
    editorState: EditorState.createEmpty() // 创建一个没有内容的编辑对象
  };
  constructor(props) {
    super(props);
    // 如果有传递内容再进行判断，不然会报错
    if (this.props.detail) {
      // 获取父组件传递过来的富文本内容
      const html = this.props.detail.props.dangerouslySetInnerHTML.__html;
      // 根据父组件传递的内容判断富文本是添加or编辑
      if (html) {
        // 如果有值,就是编辑，根据html格式字符串创建一个对应的编辑对象
        const contentBlock = htmlToDraft(html);
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );
        const editorState = EditorState.createWithContent(contentState);
        this.state = {
          editorState
        };
      } else {
        // 添加
        this.state = {
          editorState: EditorState.createEmpty() // 创建一个没有内容的编辑对象
        };
      }
    }
  }
  // 用于父组件调用获取富文本内容的方法
  getDetail = () => {
    return draftToHtml(
      convertToRaw(this.state.editorState.getCurrentContent())
    );
  };
  // 富文本内容改变执行的方法
  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };
  // 富文本图片上传的处理，有待改善！
  uploadImageCallBack = file => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:5001/api/v1/upload'); // 后端上传图片的接口地址
      xhr.setRequestHeader('Authorization', 'Bearer ' + localGettoken('token'));
      const data = new FormData();
      data.append('image', file);
      xhr.send(data);
      xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText);
        const url = response.url;
        resolve({ data: { link: url } }); // 后端返回的url地址
      });
      xhr.addEventListener('error', () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    });
  };
  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          // wrapperClassName="demo-wrapper"
          // editorClassName="demo-editor"
          editorStyle={{
            border: '1px solid #000',
            minHeight: 200,
            paddingLeft: 10,
            width: '80%',
            marginLeft: 20
          }}
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            // 富文本工具栏其他设置
            // inline: { inDropdown: true },
            // list: { inDropdown: true },
            // textAlign: { inDropdown: true },
            // link: { inDropdown: true },
            // history: { inDropdown: true },
            image: {
              urlEnabled: true,
              uploadEnabled: true,
              previewImage: true,
              inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
              uploadCallback: this.uploadImageCallBack,
              alt: { present: true, mandatory: true }
            }
          }}
        />
        {/* 用于显示富文本原始内容 */}
        {/* <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        /> */}
      </div>
    );
  }
}
export default RichTextEdit;
