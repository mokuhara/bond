import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from 'react-router-dom';

import PrivateRoute from './privateRoute'
import Auth from '../pages/auth/authen/auth'
import UserInfo from "../pages/auth/userInfo/userInfo"
import SpecialistMypage from '../layouts/mypage/specialist'
import ClientMypage from '../layouts/mypage/client'
import BizpackRoutes from "./mypage/specialist/BizpackRoutes"
import Profile from "../pages/mypage/specialist/profile/profile"
import PortfolioIndex from "../pages/mypage/specialist/portfolio/portfolioIndex"
import PortfolioCreate from "../pages/mypage/specialist/portfolio/portfolioCreate"

import TransactionIndex from "../pages/mypage/specialist/transaction/index"
import Transaction from "../pages/mypage/specialist/transaction/show"
import IssueRoutes from "./mypage/client/IssueRoutes"


import BizpackNew from "../pages/mypage/specialist/bizpack/new"
import BizpackIndex from  "../pages/mypage/specialist/bizpack/index"
import BizpackEdit from "../pages/mypage/specialist/bizpack/edit"

import ClientBizPackIndex from "../pages/mypage/client/bizpack/index"
import ClientBizPackShow from "../pages/mypage/client/bizpack/show"


const RootRouter: React.FC = () => {
    return (
        <Router>
            <Switch>
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


                <PrivateRoute path='/mypage/transactions'>
                    <SpecialistMypage><TransactionIndex /></SpecialistMypage>
                </PrivateRoute>
                <PrivateRoute path='/mypage/transaction'>
                    <SpecialistMypage><Transaction /></SpecialistMypage>
                </PrivateRoute>


                {/* specialistMypage */}
                <PrivateRoute path='/mypage/specialist/profile'>
                    <SpecialistMypage><Profile /></SpecialistMypage>
                </PrivateRoute>
                <PrivateRoute path='/mypage/specialist/portfolio/create'>
                    <SpecialistMypage><PortfolioCreate /></SpecialistMypage>
                </PrivateRoute>
                <PrivateRoute path='/mypage/specialist/portfolio'>
                    <SpecialistMypage><PortfolioIndex /></SpecialistMypage>
                </PrivateRoute>
                <Route path='/mypage/specialist' component={SpecialistMypage} />

                {/* clientMypage */}
                { IssueRoutes }
                <PrivateRoute path='/mypage/client/bizpacks'>
                    <ClientMypage><ClientBizPackIndex /></ClientMypage>
                </PrivateRoute>
                <PrivateRoute path='/mypage/client/bizpack'>
                    <ClientMypage><ClientBizPackShow /></ClientMypage>
                </PrivateRoute>
                <Route path='/mypage/client' component={ClientMypage} />
            </Switch>
        </Router>
    );
};

export default RootRouter;
