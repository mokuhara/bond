import React from 'react'
import PrivateRoute from "../../privateRoute"
import IssueNew from '../../../pages/mypage/client/issue/new'
import IssueIndex from '../../../pages/mypage/client/issue/index'
import IssueShow from '../../../pages/mypage/client/issue/show'
import IssueEdit from '../../../pages/mypage/client/issue/edit'
import Mypage from '../../../pages/mypage/mypage'

const IssueRoutes = [
        <PrivateRoute path='/mypage/issue/create'>
            <Mypage><IssueNew /></Mypage>
        </PrivateRoute>,
        <PrivateRoute path='/mypage/issue/index'>
            <Mypage><IssueIndex /></Mypage>
        </PrivateRoute>,
        <PrivateRoute path='/mypage/issue/edit'>
            <Mypage><IssueEdit /></Mypage>
        </PrivateRoute>,
        <PrivateRoute path='/mypage/issue'>
            <Mypage><IssueShow /></Mypage>
        </PrivateRoute>
]

export default IssueRoutes