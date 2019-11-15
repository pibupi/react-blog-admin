import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import htmlToDraft from 'html-to-draftjs';
import { localGettoken } from '../../utils/storage';

class RichTextEdit extends Component {
  state = {
    editorState: EditorState.createEmpty(), // 创建一个没有内容的编辑对象
  }
  constructor(props) {
    super(props);
    if(this.props.detail){
      const html = this.props.detail.props.dangerouslySetInnerHTML.__html
      if (html) {
        // 如果有值, 根据html格式字符串创建一个对应的编辑对象
        const contentBlock = htmlToDraft(html);
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );
        const editorState = EditorState.createWithContent(contentState);
        this.state = {
          editorState
        };
      } else {
        this.state = {
          editorState: EditorState.createEmpty() // 创建一个没有内容的编辑对象
        };
      }
    }
  }

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };
  getDetail = () => {
    return draftToHtml(
      convertToRaw(this.state.editorState.getCurrentContent())
    );
  };
  uploadImageCallBack = file => {
    console.log(file);
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:5001/api/v1/upload'); // 后端上传图片的接口地址
      xhr.setRequestHeader('Authorization', 'Bearer ' + localGettoken('token'));
      const data = new FormData();
      console.log(file);
      data.append('image', file);
      console.log(data);
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
            width:'80%',
            marginLeft:20
          }}
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            // inline: { inDropdown: true },
            // list: { inDropdown: true },
            // textAlign: { inDropdown: true },
            // link: { inDropdown: true },
            // history: { inDropdown: true },
            image: {
              urlEnabled:true,
              uploadEnabled:true,
              previewImage:true,
              inputAccept:'image/gif,image/jpeg,image/jpg,image/png,image/svg',
              uploadCallback: this.uploadImageCallBack,
              alt: { present: true, mandatory: true }
            }
          }}
        />
        {/* <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        /> */}
      </div>
    );
  }
}
export default RichTextEdit;
