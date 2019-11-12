import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';

import { getArticleList } from '../../actions/articleAction';

const columns = [
  {
    title: '序号',
    width: '10%',
    render: (text, record, index) => `${index + 1}`,
    key: 'id'
  },
  {
    title: '文章标题',
    dataIndex: 'title'
  },
  {
    title: '文章内容',
    dataIndex: 'content'
  }
  // {
  //   title: 'Tags',
  //   key: 'tags',
  //   dataIndex: 'tags',
  //   render: tags => (
  //     <span>
  //       {tags.map(tag => {
  //         let color = tag.length > 5 ? 'geekblue' : 'green';
  //         if (tag === 'loser') {
  //           color = 'volcano';
  //         }
  //         return (
  //           <Tag color={color} key={tag}>
  //             {tag.toUpperCase()}
  //           </Tag>
  //         );
  //       })}
  //     </span>
  //   ),
  // },
  // {
  //   title: 'Action',
  //   key: 'action',
  //   render: (text, record) => (
  //     <span>
  //       <a>Invite {record.name}</a>
  //       <Divider type="vertical" />
  //       <a>Delete</a>
  //     </span>
  //   ),
  // },
];

const mapState = state => ({
  articleList: state.article.articleList
});
@connect(
  mapState,
  { getArticleList }
)
class ArticleList extends Component {
  constructor() {
    super();
    this.state = {
      current: '',
      pageSize: ''
    };
  }
  componentDidMount() {
    this.props.getArticleList();
  }
  render() {
    const { articleList } = this.props;
    return (
      <div>
        <Table columns={columns} rowKey="id" dataSource={articleList} />
      </div>
    );
  }
}

export default ArticleList;
