import React from 'react';
import './App.css';
import Auth from "./features/auth/authen/auth"
import UserInfo from "./features/auth/userInfo/userInfo"
import Mypage from "./features/mypage/mypage"

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path='/userinfo'>
            <UserInfo />
          </Route>
          <Route path='/mypage'>
            <Mypage />
          </Route>
          <Route path='/'>
            <Auth />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
