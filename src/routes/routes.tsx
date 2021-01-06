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
import BizpackRoutes from "./mypage/specialist/BizpackRoutes"
import Profile from "../pages/mypage/specialist/profile/profile"
import PortfolioIndex from "../pages/mypage/specialist/portfolio/portfolioIndex"
import PortfolioCreate from "../pages/mypage/specialist/portfolio/portfolioCreate"

import SpecialistTransactionIndex from "../pages/mypage/specialist/transaction/index"
import SpecialistTransaction from "../pages/mypage/specialist/transaction/show"
import ClientTransactionIndex from "../pages/mypage/client/transaction/index"
import ClientTransactionEdit from "../pages/mypage/client/transaction/edit"
import ClientTransaction from "../pages/mypage/client/transaction/show"
import IssueRoutes from "./mypage/client/IssueRoutes"


import BizpackNew from "../pages/mypage/specialist/bizpack/new"
import BizpackIndex from  "../pages/mypage/specialist/bizpack/index"
import BizpackEdit from "../pages/mypage/specialist/bizpack/edit"

import ThreadEdit from "../pages/mypage/chat/thread/edit"
import ThreadShow from "../pages/mypage/chat/thread/show"
import ClientBizPackIndex from "../pages/mypage/client/bizpack/index"
import ClientBizPackShow from "../pages/mypage/client/bizpack/show"
import Chat from "../pages/mypage/chat"

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
                <PrivateRoute exact path='/mypage/chat/thread'>
                    <Mypage><ThreadShow /></Mypage>
                </PrivateRoute>

                <Route exact path='/' component={Auth} />
                    <PrivateRoute path='/userinfo' component={UserInfo} />
                {/* <BizpackRoutes/> */}

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
                { IssueRoutes }
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
