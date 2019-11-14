import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, Button, Input, Tag } from 'antd';

import { getArticleList,deleteArticle } from '../../actions/articleAction';

const { Search } = Input;

const mapState = state => ({
  articleList: state.article.articleList
});
@connect(mapState, { getArticleList,deleteArticle })
class ArticleList extends Component {
  constructor() {
    super();
    this.state = {
      current: '',
      pageSize: '',
      columns: [
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
          title: '文章描述',
          dataIndex: 'desc'
        },
        {
          title: '分类',
          dataIndex: 'categoryId',
          render: tags => (
            <span>
              {/* {tags.map(tag => {
                let color = tag.length > 5 ? 'geekblue' : 'green';
                if (tag === 'loser') {
                  color = 'volcano';
                } */}
              {/* return ( */}
              {/* <Tag color={color} key={tag}> */}
              <Tag>
                {/* {tag.toUpperCase()} */}
                123
              </Tag>
              {/* ); */}
              {/* })} */}
            </span>
          )
        },
        {
          title: '发布时间',
          dataIndex: 'createdAt'
        },
        {
          title: '更新时间',
          dataIndex: 'updatedAt'
        },
        {
          title: '作者',
          dataIndexd: 'author'
        },
        // {
        //   title: 'Tags',
        //   key: 'tags',
        //   dataIndex: 'tags',
        //   render: tags => (
        //     <span>
        //       {/* {tags.map(tag => {
        //         let color = tag.length > 5 ? 'geekblue' : 'green';
        //         if (tag === 'loser') {
        //           color = 'volcano';
        //         } */}
        //         {/* return ( */}
        //           {/* <Tag color={color} key={tag}> */}
        //           <Tag >
        //             {/* {tag.toUpperCase()} */}
        //             123
        //           </Tag>
        //         {/* ); */}
        //       {/* })} */}
        //     </span>
        //   ),
        // },
        {
          title: '操作',
          key: 'action',
          width: 200,
          render: (text, record) => (
            <span>
              <Link to={{ pathname: '/admin/article/edit', state: { record } }}>
                <Button type="primary">编辑</Button>
              </Link>
              <Button type="danger" onClick={()=>this.deleteArticle(record.id)}>删除</Button>
            </span>
          )
        }
      ]
    };
  }
  addArticleBtn = () => {
    console.log(this);
    this.props.history.push('/admin/article/edit');
  };
  searchArticleList = value => {
    console.log(value);
  };
  deleteArticle =(id) =>{
    this.props.deleteArticle(id)
    // this.props.getArticleList();
  }
  componentDidMount() {
    this.props.getArticleList();
  }
  render() {
    const { articleList } = this.props;
    // console.log(articleList)
    // 对后台返回的富文本内容进行处理
    articleList.forEach(item => {
      item.content = (
        <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
      );
    });
    return (
      <div>
        <div>
          <Search
            style={{ width: '30%', margin: 30 }}
            placeholder="输入搜索条件"
            enterButton
            onSearch={value => this.searchArticleList(value)}
          />
        </div>
        <Button
          type="primary"
          style={{ margin: '0 0 30px 30px' }}
          onClick={this.addArticleBtn}
        >
          添加文章
        </Button>
        <div className="article-list">
          <Table
            bordered
            style={{ width: '80%', marginLeft: 30 }}
            columns={this.state.columns}
            rowKey="id"
            dataSource={articleList}
          />
        </div>
      </div>
    );
  }
}

export default ArticleList;
