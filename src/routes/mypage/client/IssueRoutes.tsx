import React from 'react'
import PrivateRoute from "../../privateRoute"
import IssueNew from '../../../pages/mypage/client/issue/new'
import IssueIndex from '../../../pages/mypage/client/issue/index'
import IssueShow from '../../../pages/mypage/client/issue/show'
import IssueEdit from '../../../pages/mypage/client/issue/edit'
import Mypage from '../../../layouts/mypage/client/menuLists'

const IssueRoutes = [
        <PrivateRoute exact path='/mypage/client/issue/new'>
            <Mypage><IssueNew /></Mypage>
        </PrivateRoute>,
        <PrivateRoute exact path='/mypage/client/issue/index'>
            <Mypage><IssueIndex /></Mypage>
        </PrivateRoute>,
        <PrivateRoute exact path='/mypage/client/issue/edit'>
            <Mypage><IssueEdit /></Mypage>
        </PrivateRoute>,
        <PrivateRoute exact path='/mypage/client/issue'>
            <Mypage><IssueShow /></Mypage>
        </PrivateRoute>,
]

export default IssueRoutes