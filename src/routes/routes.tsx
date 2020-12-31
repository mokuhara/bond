import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from 'react-router-dom';

import PrivateRoute from './privateRoute'
import Auth from '../pages/auth/authen/auth'
import UserInfo from "../pages/auth/userInfo/userInfo"
import Mypage  from "../pages/mypage/mypage"
import BizpackRoutes from "./mypage/specialist/BizpackRoutes"
import Profile from "../pages/mypage/specialist/profile/profile"
import PortfolioIndex from "../pages/mypage/specialist/portfolio/portfolioIndex"
import PortfolioCreate from "../pages/mypage/specialist/portfolio/portfolioCreate"
import TransactionIndex from "../pages/mypage/specialist/transaction/index"
import Transaction from "../pages/mypage/specialist/transaction/show"

const RootRouter: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Auth} />
                <PrivateRoute path='/userinfo' component={UserInfo} />
                <BizpackRoutes/>
                <PrivateRoute path='/mypage/profile'>
                    <Mypage><Profile /></Mypage>
                </PrivateRoute>
                <PrivateRoute path='/mypage/portfolio/create'>
                    <Mypage><PortfolioCreate /></Mypage>
                </PrivateRoute>
                <PrivateRoute path='/mypage/portfolio'>
                    <Mypage><PortfolioIndex /></Mypage>
                </PrivateRoute>
                <PrivateRoute path='/mypage/transactions'>
                    <Mypage><TransactionIndex /></Mypage>
                </PrivateRoute>
                <PrivateRoute path='/mypage/transaction'>
                    <Mypage><Transaction /></Mypage>
                </PrivateRoute>
                <Route path='/mypage' component={Mypage} />
            </Switch>
        </Router>
    );
};

export default RootRouter;