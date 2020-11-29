import React from 'react';
import './App.css';
import Auth from "./features/auth/authen/auth"
import UserInfo from "./features/auth/userInfo/userInfo"
import Mypage from "./features/mypage/mypage"

import PrivateRoute from "./routes/privateRoute"

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
          <PrivateRoute path='/userinfo/:id' component={UserInfo} />
          <PrivateRoute path='/mypage/:id' component={Mypage} />
          <Route path='/'  component={Auth} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
