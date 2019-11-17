import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, Button, Input, Tag } from 'antd';
import { getArticleList, deleteArticle } from '../../actions/articleAction';
import './list.less';
const { Search } = Input;

const mapState = state => ({
  articleList: state.article.articleList,
  total: state.article.total
});
@connect(mapState, { getArticleList, deleteArticle })
class ArticleList extends Component {
  constructor() {
    super();
    this.state = {
      offset: 1,
      limited: 5,
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
          width: 180,
          render: (text, record) => (
            <span>
              <Link to={{ pathname: '/admin/article/edit', state: { record } }}>
                <Button type="primary">编辑</Button>
              </Link>
              <Button
                type="danger"
                style={{ marginLeft: 10 }}
                onClick={() => this.deleteArticle(record.id)}
              >
                删除
              </Button>
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
  deleteArticle = id => {
    this.props.deleteArticle(id);
    // this.props.getArticleList(this.state.offset, this.state.limited);
  };
  onPageChange = (page, pageSize) => {
    this.setState(
      {
        offset: page,
        limited: pageSize
      },
      () => {
        console.log(this.state.offset,this.state.limited)
        this.props.getArticleList(this.state.offset, this.state.limited);
      }
    );
  };
  componentDidMount() {
    this.props.getArticleList(this.state.offset, this.state.limited);
  }
  render() {
    const { articleList, total } = this.props;
    // console.log(articleList)
    // 对后台返回的富文本内容进行处理
    articleList.forEach(item => {
      item.content = (
        <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
      );
    });
    return (
      <div className="article-list-wrap">
        <div className="article-list-header">
          <Search
            className="article-list-search"
            placeholder="输入搜索条件"
            enterButton
            onSearch={value => this.searchArticleList(value)}
          />
          <Button type="primary" onClick={this.addArticleBtn}>
            添加文章
          </Button>
        </div>
        <div className="article-list">
          <Table
            bordered
            columns={this.state.columns}
            rowKey="id"
            dataSource={articleList}
            style={{ backgroundColor: '#fefefe' }}
            pagination={{
              // current:this.state.offset / this.state.limited +1,
              defaultCurrent: 1,
              total: total,
              // showTotal:{this.props.total=>`总共 ${detailTotal} 条记录`},
              pageSize: this.state.limited,
              // hideOnSinglePage:true,
              // showQuickJumper:true,
              // showSizeChanger:true,
              // pageSizeOptions:['20','40','60','80'],
              // onShowSizeChange:this.onShowSizeChange,
              onChange: this.onPageChange
            }}
          />
        </div>
      </div>
    );
  }
}

export default ArticleList;
