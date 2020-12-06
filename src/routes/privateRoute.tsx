import React from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom'

import Cookies from 'js-cookie'

import _ from 'lodash'

const PrivateRoute: React.FC<RouteProps> = props => {
  const auth = Cookies.get('bdt')
  const isAuthenticated = Boolean(auth)

  const rest = _.omit(props, ['component'])
  return (
    <Route
      {...rest}
      render={innerProps =>
        isAuthenticated ? (
          <Route {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: innerProps.location }
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute