import {
  Home,
  Login,
  // Register,
  Dashboard,
  ArticleList,
  Simplemde,
  // AddArticle,
  // ArticleRich,
  // ForEdit, // for-edit 测试编辑器
  User,
  Power,
  Role,
  Other,
  NotFound,
  Notification,
  Category
} from '../views';
// 静态路由
const mainRoutes = [
  {
    pathname: '/login',
    component: Login
  },
  // {
  //   pathname: '/register',
  //   component: Register
  // },
  {
    pathname: '/admin',
    component: Home
  },
  {
    pathname: '/404',
    component: NotFound
  }
];
// 动态路由
const adminRoutes = [
  {
    pathname: '/admin/dashboard',
    title: '数据统计',
    icon: 'dashboard',
    component: Dashboard,
    isNav: true,
    key: '/admin/dashboard'
  },
  {
    pathname: '/admin/article',
    title: '项目管理',
    icon: 'build',
    exact: true,
    isNav: true,
    key: '/admin/article',
    children: [
      {
        pathname: '/admin/article/articlelist',
        component: ArticleList,
        title: '文章列表',
        icon: 'ordered-list',
        isNav: true,
        key: '/admin/article/articlelist'
      },
      // markdown
      {
        pathname: '/admin/article/simplemde',
        component: Simplemde,
        title: '文章编辑',
        icon: 'edit',
        isNav: false,
        key: '/admin/article/simplemde'
      },
      // {
      //   pathname: '/admin/article/simplemde',
      //   component: AddArticle,
      //   title: '文章编辑',
      //   icon: 'edit',
      //   isNav: false,
      //   key: '/admin/article/simplemde'
      // },
      // 富文本
      // {
      //   pathname: '/admin/article/rich',
      //   component: ArticleRich,
      //   title: '文章编辑',
      //   icon: 'edit',
      //   isNav: false,
      //   key: '/admin/article/rich'
      // },
      // for-edit测试编辑器
      // {
      //   pathname: '/admin/article/for-edit',
      //   component: ForEdit,
      //   title: '文章编辑3',
      //   icon: 'edit',
      //   isNav: false,
      //   key: '/admin/article/for-edit'
      // },
      {
        pathname: '/admin/article/categoryList',
        component: Category,
        title: '分类管理',
        icon: 'edit',
        isNav: true,
        key: '/admin/article/categoryList'
      }
    ]
  },
  {
    pathname: '/admin/settings',
    title: '设置',
    icon: 'setting',
    exact: true,
    isNav: true,
    key: '/admin/settings',
    children: [
      {
        pathname: '/admin/settings/role',
        component: Role,
        title: '角色管理',
        icon: 'smile',
        isNav: true,
        key: '/admin/settings/role'
      },
      {
        pathname: '/admin/settings/user',
        component: User,
        title: '用户管理',
        icon: 'user',
        isNav: true,
        key: '/admin/settings/user'
      },
      {
        pathname: '/admin/settings/power',
        component: Power,
        title: '权限管理',
        icon: 'phone',
        isNav: true,
        key: '/admin/settings/power'
      }
    ]
  },
  {
    pathname: '/admin/other',
    component: Other,
    title: '其他',
    icon: 'more',
    isNav: true,
    key: '/admin/other'
  },
  {
    pathname: '/admin/notification',
    component: Notification,
    isNav: false,
    key: '/admin/notification'
  }
];
export { mainRoutes, adminRoutes };
