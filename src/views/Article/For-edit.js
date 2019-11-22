import React, { Component } from 'react';
import Editor from 'for-editor';
import { $http } from '../../service/http';
// 此页面为测试for-editor markdown编辑器
class Edit3 extends Component {
  constructor() {
    super();
    this.state = {
      value: ''
    };
    this.$vm = React.createRef();
  }

  handleChange(value) {
    this.setState({
      value
    });
  }

  addImg($file) {
    this.$vm.current.$img2Url($file.name, 'file_url');
    console.log($file);
    var formData = new FormData();
    formData.append('image', $file);
    // var config = {
    //   headers: {
    //     "Content-Type": "multipart/form-data"
    //   }
    // }
    $http.post('http://localhost:5001/api/v1/upload', formData).then(res => {
      // var urlname=`↵[](${res.url})↵`
      // ![](http://)
      // ↵[](http://localhost:5001/upload/image-1574084685492.png)↵
      // this.smde.value(`${this.content}\n${urlname}\n`)
      console.log(res.url);
      this.$vm.current.$img2Url($file.name, res.url);
    });
  }

  render() {
    const { value } = this.state;

    return (
      <Editor
        ref={this.$vm}
        value={value}
        addImg={$file => this.addImg($file)}
        onChange={value => this.handleChange(value)}
      />
    );
  }
}
export default Edit3;
