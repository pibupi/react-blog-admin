import React from 'react';
import { render } from 'react-dom';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';
import { mainRoutes } from './routes';
import App from './App';
import './index.less';

render(
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      {/* 渲染静态路由 */}
      <Router>
        <Switch>
          <Route
            path="/admin"
            render={routerProps => {
              return <App {...routerProps} />;
            }}
          />
          {mainRoutes.map(route => {
            return (
              <Route
                key={route.pathname}
                path={route.pathname}
                component={route.component}
              />
            );
          })}
          <Redirect to="/admin" from="/" exact />
          <Redirect to="/404" />
        </Switch>
      </Router>
    </ConfigProvider>
  </Provider>,
  document.querySelector('#root')
);
