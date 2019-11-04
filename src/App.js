import React, { Component } from 'react';
import {Route,Switch,Redirect} from 'react-router-dom'
import {adminRoutes} from './routes'
import {Home} from './views'
class App extends Component {
  renderRoute = (adminRoutes) => {
    return adminRoutes.map(route=>{
        if(!route.children){
          return (
            <Route 
              key={route.pathname}
              path={route.pathname}
              exact={route.exact}
              render={routerProps=>{
                return <route.component {...routerProps}/>
              }}
            />
          )
        }else{
          return (
            this.renderRoute(route.children)
          )
        }
    })
  }
  render() {
    return (
      <Home >
        <Switch>
          {
            this.renderRoute(adminRoutes)
          }
          <Redirect to={adminRoutes[0].pathname} from="/admin" exact />
          <Redirect to="/404" />
        </Switch>
      </Home>
    );
  }
}

export default App;