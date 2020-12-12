import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from 'react-router-dom';

import PrivateRoute from './privateRoute'
import Auth from '../features/auth/authen/auth'
import UserInfo from "../features/auth/userInfo/userInfo"
import Mypage  from "../features/mypage/mypage"
import BizpackIndex from "../features/mypage/bizpack/bizpackIndex"
import BizpackCreate from "../features/mypage/bizpack/bizpackCreate"
import Profile from "../features/mypage/profile/profile"
import PortfolioCreate from "../features/mypage/portfolio/portfolioCreate"
import PortfolioIndex from "../features/mypage/portfolio/portfolioIndex"
import TransactionIndex from "../features/mypage/transaction/transactionIndex"
import BizpackEdit from "../features/mypage/bizpack/bizpackEdit"
import PortfolioEdit from "../features/mypage/portfolio/portfolioEdit"


const RootRouter: React.FC = () => {
    return (
      <>
        <Router>
            <Switch>
                <PrivateRoute path='/userinfo' component={UserInfo} />
                <PrivateRoute path='/mypage/bizpack/create'>
                    <Mypage><BizpackCreate /></Mypage>
                </PrivateRoute>
                <PrivateRoute path='/mypage/bizpack/edit'>
                    <Mypage><BizpackEdit /></Mypage>
                </PrivateRoute>
                <PrivateRoute  path='/mypage/bizpack'>
                    <Mypage><BizpackIndex /></Mypage>
                </PrivateRoute>
                <PrivateRoute path='/mypage/portfolio/create'>
                    <Mypage><PortfolioCreate /></Mypage>
                </PrivateRoute>
                <PrivateRoute path='/mypage/portfolio/edit'>
                    <Mypage><PortfolioEdit /></Mypage>
                </PrivateRoute>
                <PrivateRoute path='/mypage/profile'>
                    <Mypage><Profile /></Mypage>
                </PrivateRoute>
                <PrivateRoute path='/mypage/portfolio'>
                    <Mypage><PortfolioIndex /></Mypage>
                </PrivateRoute>
                <PrivateRoute path='/mypage/transaction'>
                    <Mypage><TransactionIndex /></Mypage>
                </PrivateRoute>
                <PrivateRoute path='/mypage' component={Mypage} />
                <Route exact path='/'  component={Auth} />
            </Switch>
        </Router>
      </>
    );
  };

export default RootRouter;