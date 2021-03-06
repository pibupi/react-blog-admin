import Loadable from 'react-loadable';
import Loading from '../components/Loading';
// 路由懒加载
const Home = Loadable({
  loader: () => import('./Home'),
  loading: Loading
});
const Login = Loadable({
  loader: () => import('./Login'),
  loading: Loading
});
// const Register = Loadable({
//   loader: () => import('./Register'),
//   loading: Loading
// });
const Dashboard = Loadable({
  loader: () => import('./Dashboard'),
  loading: Loading
});
const ArticleList = Loadable({
  loader: () => import('./Article/List'),
  loading: Loading
});
// markdown
const Simplemde = Loadable({
  loader: () => import('./Article/Simplemde'),
  loading: Loading
});
// 新增的
// const AddArticle = Loadable({
//   loader: () => import('./Article/Add-article'),
//   loading: Loading
// })
// 富文本
// const ArticleRich = Loadable({
//   loader: () => import('./Article/Rich'),
//   loading: Loading
// });
// for-edit 测试编辑器
// const ForEdit = Loadable({
//   loader: () => import('./Article/For-edit'),
//   loading: Loading
// });
const Role = Loadable({
  loader: () => import('./Settings/Role'),
  loading: Loading
});
const User = Loadable({
  loader: () => import('./Settings/User/User'),
  loading: Loading
});
const Power = Loadable({
  loader: () => import('./Settings/Power'),
  loading: Loading
});
const Other = Loadable({
  loader: () => import('./Other'),
  loading: Loading
});
const NotFound = Loadable({
  loader: () => import('./NotFound'),
  loading: Loading
});
const Notification = Loadable({
  loader: () => import('./Notification'),
  loading: Loading
});
const Category = Loadable({
  loader: () => import('./Category/index'),
  loading: Loading
});
export {
  Home,
  Login,
  // Register,
  Dashboard,
  ArticleList,
  // ArticleRich,
  Simplemde,
  // AddArticle,
  // ForEdit,
  Role,
  User,
  Power,
  Other,
  NotFound,
  Notification,
  Category
};
