import React from 'react'
import {render} from 'react-dom'
import {HashRouter as Router,Route,Switch,Redirect} from 'react-router-dom'
import zhCN from 'antd/es/locale/zh_CN';
import {ConfigProvider } from 'antd'
import {mainRoutes} from './routes'
import App from './App'
import './index.less'

render(
    <ConfigProvider locale={zhCN}>
      <Router>
        <Switch>
          <Route path="/admin" render={routerProps=>{
            return <App {...routerProps}/>
          }} />
          {
            mainRoutes.map(route=>{
              return <Route key={route.pathname} path={route.pathname} component={route.component}/>
            })
          }
          <Redirect to="/admin" from="/" exact/>
          <Redirect to="/404" />
        </Switch>
      </Router>
    </ConfigProvider>,
  document.querySelector('#root')
)