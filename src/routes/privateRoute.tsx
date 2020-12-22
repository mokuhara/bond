import React from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'
import _ from 'lodash'

const PrivateRoute: React.FC<RouteProps> = props => {
  const auth = Cookies.get('bdt')
  const isAuthenticated = Boolean(auth)
  const routeProps = _.omit(props, 'component')

  const isRedirect: React.FC<RouteProps> = innerProps => {
    if(isAuthenticated) {
        return <Route {...props} />
    }

    const to = {
      pathname: '/',
      state: { from: innerProps.location }
    }

    return <Redirect to={to} />
  }

  return (
    <Route
      {...routeProps}
      render={innerProps => isRedirect(innerProps)}
    />
  )
}

export default PrivateRoute