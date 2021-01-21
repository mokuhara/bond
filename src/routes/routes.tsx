import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from 'react-router-dom';

import PrivateRoute from './privateRoute'
import Auth from '../pages/auth/authen/auth'
import UserInfo from "../pages/auth/userInfo/userInfo"
import Mypage from '../layouts/mypage'

import BizpackNew from "../pages/mypage/specialist/bizpack/new"
import BizpackIndex from "../pages/mypage/specialist/bizpack/index"
import BizpackEdit from "../pages/mypage/specialist/bizpack/edit"

import Profile from "../pages/mypage/specialist/profile/profile"
import PortfolioIndex from "../pages/mypage/specialist/portfolio/portfolioIndex"
import PortfolioCreate from "../pages/mypage/specialist/portfolio/portfolioCreate"

import SpecialistTransactionIndex from "../pages/mypage/specialist/transaction/index"
import SpecialistTransaction from "../pages/mypage/specialist/transaction/show"
import ClientTransactionIndex from "../pages/mypage/client/transaction/index"
import ClientTransactionEdit from "../pages/mypage/client/transaction/edit"
import ClientTransaction from "../pages/mypage/client/transaction/show"

import IssueNew from '../pages/mypage/client/issue/new'
import IssueIndex from '../pages/mypage/client/issue/index'
import IssueShow from '../pages/mypage/client/issue/show'
import IssueEdit from '../pages/mypage/client/issue/edit'


import ThreadEdit from "../pages/mypage/chat/thread/edit"
import ThreadShow from "../pages/mypage/chat/thread/show"
import ClientBizPackIndex from "../pages/mypage/client/bizpack/index"
import ClientBizPackShow from "../pages/mypage/client/bizpack/show"

const RootRouter: React.FC = () => {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <Switch>
                <PrivateRoute exact path='/mypage/chat/thread/edit'>
                    <ThreadEdit />
                </PrivateRoute>
                <PrivateRoute exact path='/mypage/chat/thread'>
                    <ThreadShow />
                </PrivateRoute>

                <Route exact path='/' component={Auth} />
                <PrivateRoute path='/userinfo' component={UserInfo} />

                {/* <BizpackRoutes/> */}
                <PrivateRoute exact path='/mypage/specialist/bizpacks'>
                    <BizpackIndex />
                </PrivateRoute>

                <PrivateRoute path='/mypage/specialist/bizpacks/new'>
                    <BizpackNew />
                </PrivateRoute>

                <PrivateRoute exact path='/mypage/specialist/bizpacks/:id/edit'>
                    <BizpackEdit />
                </PrivateRoute>

                <PrivateRoute exact path='/mypage/chat/thread'>
                    <Mypage><ThreadShow /></Mypage>
                </PrivateRoute>

                <Route exact path='/' component={Auth} />
                <PrivateRoute path='/userinfo' component={UserInfo} />

                {/* specialistMypage */}
                <PrivateRoute path='/mypage/specialist/profile'>
                    <Mypage><Profile /></Mypage>
                </PrivateRoute>
                <PrivateRoute path='/mypage/specialist/portfolio/create'>
                    <Mypage><PortfolioCreate /></Mypage>
                </PrivateRoute>
                <PrivateRoute path='/mypage/specialist/portfolio'>
                    <Mypage><PortfolioIndex /></Mypage>
                </PrivateRoute>
                <PrivateRoute path='/mypage/specialist/transactions'>
                    <Mypage><SpecialistTransactionIndex /></Mypage>
                </PrivateRoute>
                <PrivateRoute path='/mypage/specialist/transaction'>
                    <Mypage><SpecialistTransaction /></Mypage>
                </PrivateRoute>
                <Route path='/mypage/specialist' component={Mypage} />

                {/* clientMypage */}
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

                <PrivateRoute path='/mypage/client/bizpacks'>
                    <Mypage><ClientBizPackIndex /></Mypage>
                </PrivateRoute>
                <PrivateRoute path='/mypage/client/bizpack'>
                    <Mypage><ClientBizPackShow /></Mypage>
                </PrivateRoute>
                <PrivateRoute path='/mypage/client/transactions'>
                    <Mypage><ClientTransactionIndex /></Mypage>
                </PrivateRoute>
                <PrivateRoute path='/mypage/client/transaction'>
                    <Mypage><ClientTransaction /></Mypage>
                </PrivateRoute>

                <Route path='/mypage/client' component={Mypage} />
            </Switch>
        </Router>
    );
};

export default RootRouter;
