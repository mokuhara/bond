import React from 'react'
import { RouteProps } from 'react-router-dom'
import PrivateRoute from "../../privateRoute"
import BizpackNew from "../../../pages/mypage/specialist/bizpack/new"
import BizpackIndex from  "../../../pages/mypage/specialist/bizpack/index"
import BizpackEdit from "../../../pages/mypage/specialist/bizpack/edit"

const BizpackRoutes: React.FC<RouteProps> = props => {
  return (
    <>
      <PrivateRoute exact path='/mypage/specialist/bizpacks'>
        <BizpackIndex />
      </PrivateRoute>

      <PrivateRoute path='/mypage/specialist/bizpacks/new'>
        <BizpackNew />
      </PrivateRoute>

      <PrivateRoute exact path='/mypage/specialist/bizpacks/:id/edit'>
        <BizpackEdit />
      </PrivateRoute>
    </>
  )
}

export default BizpackRoutes
