import React from 'react'
import { RouteProps } from 'react-router-dom'
import PrivateRoute from "../../privateRoute"
import BizpackNew from "../../../pages/mypage/specialist/bizpack/new"
import BizpackIndex from  "../../../pages/mypage/specialist/bizpack/index"

const BizpackRoutes: React.FC<RouteProps> = props => {
  return (
    <>
      <PrivateRoute path='/mypage/bizpack/new'>
        <BizpackNew />
      </PrivateRoute>
      <PrivateRoute path='/mypage/bizpacks'>
        <BizpackIndex />
      </PrivateRoute>
    </>
  )
}

export default BizpackRoutes
