import React from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom'
import { useSelector } from "react-redux"

import Cookies from 'js-cookie'

import _ from 'lodash'

import { selectUserInfo } from "../features/auth/authSlice"

const PrivateRoute: React.FC<RouteProps> = props => {
  const auth = Cookies.get('bdt')
  const path = (props.location && props.location.pathname) || ""
  //TODO 正規表現で無理やりpath matchしているので後々変更
  const idRegExp =  (path.match(/^.*\/(\d+)$/))
  const id = (idRegExp && parseInt(idRegExp[1])) || -1
  const userInfo = useSelector(selectUserInfo)



  const isAuthenticated = Boolean(auth) && id === userInfo.userId

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