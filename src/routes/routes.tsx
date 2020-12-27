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
// import BizpackIndex from "../pages/mypage/specialist/bizpack/bizpackIndex"
// import BizpackCreate from "../pages/mypage/specialist/bizpack/bizpackCreate"
// import BizpackEdit from "../pages/mypage/specialist/bizpack/bizpackEdit"
import BizpackRoutes from "./mypage/specialist/BizpackRoutes"
import Profile from "../pages/mypage/specialist/profile/profile"
import PortfolioIndex from "../pages/mypage/specialist/portfolio/portfolioIndex"
import PortfolioCreate from "../pages/mypage/specialist/portfolio/portfolioCreate"
// import TransactionIndex from "../pages/mypage/specialist/transaction/transactionIndex"
// import Transaction from "../pages/mypage/specialist/transaction/transaction"
import IssueCreate from "../pages/mypage/client/issue/createIssue"

const RootRouter: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Auth} />
                <PrivateRoute path='/userinfo' component={UserInfo} />
                {/* <BizpackRoutes/> */}
                {/* <PrivateRoute path='/mypage/bizpack/create'>
                    <Mypage><BizpackCreate /></Mypage>
                </PrivateRoute>
                <PrivateRoute path='/mypage/bizpack/edit'>
                    <Mypage><BizpackEdit /></Mypage>
                </PrivateRoute>
                <PrivateRoute  path='/mypage/bizpack'>
                    <Mypage><BizpackIndex /></Mypage>
                </PrivateRoute>
                <PrivateRoute path='/mypage/bizpack/create'>
                    <Mypage><BizpackCreate /></Mypage>
                </PrivateRoute> */}
                <PrivateRoute path='/mypage/profile'>
                    <Mypage><Profile /></Mypage>
                </PrivateRoute>
                <PrivateRoute path='/mypage/portfolio/create'>
                    <Mypage><PortfolioCreate /></Mypage>
                </PrivateRoute>
                <PrivateRoute path='/mypage/portfolio'>
                    <Mypage><PortfolioIndex /></Mypage>
                </PrivateRoute>
                {/* <PrivateRoute path='/mypage/transactions'>
                    <Mypage><TransactionIndex /></Mypage>
                </PrivateRoute>
                <PrivateRoute path='/mypage/transaction'>
                    <Mypage><Transaction /></Mypage>
                </PrivateRoute> */}
                <PrivateRoute path='/mypage/issue/create'>
                    <Mypage><IssueCreate /></Mypage>
                </PrivateRoute>
                <Route path='/mypage' component={Mypage} />
            </Switch>
        </Router>
    );
};

export default RootRouter;
