import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, Button, Input, Tag, message, Breadcrumb } from 'antd';
import {
  getArticleListAction,
  deleteArticleAction
} from '../../actions/articleAction';
import './list.less';
const { Search } = Input;

const mapState = state => ({
  articleList: state.article.articleList,
  count: state.article.count,
  auth: state.user.auth
});
@connect(mapState, { getArticleListAction, deleteArticleAction })
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
        // 分类联表查询待实现
        {
          title: '分类',
          dataIndex: 'category_name',
          render: tags => (
            <span>
              <Tag>{tags}</Tag>
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
          dataIndex: 'author'
        },
        {
          title: '操作',
          key: 'action',
          width: 180,
          render: (text, record) => (
            <span>
              {/* 把当前行数据存储到路由state中，在编辑页用于区分添加/编辑 */}
              <Link
                to={{ pathname: '/admin/article/simplemde', state: { record } }}
              >
                {
                  this.props.auth === '2' ? '' : <Button type="primary">编辑</Button>
                }
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
  // 点击添加按钮跳转到编辑页
  addArticleBtn = () => {
    if (this.props.auth === '2') {
      message.warning('权限不足');
      return;
    }
    this.props.history.push('/admin/article/simplemde');
  };
  // 根据文章标题搜索文章，后续可增加多条件模糊查询
  searchArticleList = value => {
    this.setState(
      {
        offset: 1,
        limited: 5
      },
      () => {
        this.props.getArticleListAction(
          this.state.offset,
          this.state.limited,
          value
        );
      }
    );
  };
  // 删除
  deleteArticle = async id => {
    if (this.props.auth === '2') {
      message.warning('权限不足');
      return;
    }
    let { code, msg } = await this.props.deleteArticleAction(id);
    if (code === 0) {
      message.success(msg);
      this.props.getArticleListAction(this.state.offset, this.state.limited);
    }
  };
  // 分页
  onPageChange = (page, pageSize) => {
    this.setState(
      {
        offset: page,
        limited: pageSize
      },
      () => {
        this.props.getArticleListAction(this.state.offset, this.state.limited);
      }
    );
  };
  // 表格初始化
  componentDidMount() {
    this.props.getArticleListAction(this.state.offset, this.state.limited);
  }
  render() {
    const { articleList, count } = this.props;
    console.log(articleList);
    // 对后台返回的富文本内容进行处理
    articleList.forEach(item => {
      item.content = (
        <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
      );
    });
    return (
      <div className="article-list-wrap">
        <Breadcrumb separator="//">
          <Breadcrumb.Item href="/admin">Home</Breadcrumb.Item>
          <Breadcrumb.Item >文章管理</Breadcrumb.Item>
          <Breadcrumb.Item href="/admin/article/articlelist">文章列表</Breadcrumb.Item>
        </Breadcrumb>
        <div className="article-list-header">
          {/* 搜索可以添加一个分类查询 */}
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
          {/* 表格loading暂未实现 */}
          <Table
            bordered
            columns={this.state.columns}
            rowKey="id"
            dataSource={articleList}
            style={{ backgroundColor: '#fefefe' }}
            pagination={{
              // current:this.state.offset / this.state.limited +1,
              defaultCurrent: 1,
              total: count,
              showTotal: count => `共 ${count} 条`,
              pageSize: this.state.limited,
              // 分页其他相关配置，暂未实现
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
