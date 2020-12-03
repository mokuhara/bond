import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from 'react-router-dom';

import PrivateRoute from './privateRoute'
import Auth from '../features/auth/authen/auth'
import UserInfo from "../features/auth/userInfo/userInfo"
import  Mypage  from "../features/mypage/mypage"
import BizpackIndex from "../features/mypage/bizpack/bizpackIndex"
import BizpackCreate from "../features/mypage/bizpack/bizpackCreate"


const RootRouter: React.FC = () => {
    return (
      <>
        <Router>
            <Switch>
                <PrivateRoute  path='/mypage/bizpack/index'>
                    <Mypage><BizpackIndex /></Mypage>
                </PrivateRoute>
                <PrivateRoute path='/mypage/bizpack/create'>
                    <Mypage><BizpackCreate /></Mypage>
                </PrivateRoute>
                <PrivateRoute path='/mypage/:id' component={Mypage} />
                <PrivateRoute path='/userinfo/:id' component={UserInfo} />
                <Route exact path='/'  component={Auth} />
            </Switch>
        </Router>
      </>
    );
  };

export default RootRouter;