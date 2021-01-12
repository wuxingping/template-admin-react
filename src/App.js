import React, { lazy,Suspense } from 'react'
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import Login from 'page/Login'
import NoMatch from 'page/404';
import 'css/default.css';
import { Spin } from 'antd'
import { isAuth } from 'utils'

//isAuth 是否有权限
//rest接收剩余参数
//Redirect无权限的，重定向
//state存储重定向前的url,需通过props.location拿取
const AuthRoute = ({ component: Component, ...rest }) => {
  return (
    <Suspense fallback={<Spin />}>
      <Route
        render={props =>
          isAuth() ? (
            <Component {...props} {...rest} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location }
              }}
            />
          )
        }
      />
    </Suspense>
  )
}
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/login" />} />
        <Route exact path="/login" component={Login} />     
        <AuthRoute path="/" component={lazy(() => import('page/Layout/index'))} />
        <Route path="/404" component={NoMatch} />
      </Switch>
    </Router>
  )
}

export default App
