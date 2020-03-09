### 项目介绍
* react-blog-admin为博客后台管理系统
* 前后端分离项目
* 文章功能支持markdown方式编写及展示
### 技术栈
* React全家桶
* Axios
* Less
* Ant Design
* Eslint + Prettier
### 预览

### 已实现功能

- [x] 登录
- [x] 文章管理
- [x] 标签管理
- [x] 用户管理
- [x] markdown编辑器
- [x] 私密文章
### 待实现功能

- [] 留言管理
- [] 评论管理
- [] 个人中心
- [] 七牛

项目启动
```
git clone git@github.com:zhanghe888/react-blog-admin.git

cd react-blog-admin

npm install

npm start
```
### 项目结构
```
react-blog-admin

├─ lessThemeVars.js    // Ant Design主题文件
├─ .gitignore          // git忽略文件
├─ src
│    ├─ action         // action
│    ├─ assets         // 静态资源
│    ├─ components     // 公共组件
│    ├─ rducer         // reduer
│    ├─ routes         // 路由表
│    ├─ service        // axios封装
│    └─ utils          // 常用工具
│    └─ views          // 业务模块
└─ config-overrides.js // webpack配置文件
```

### 未来
* 采用webpack4+，从头到尾配置工程环境，加入TypeScript重构此项目