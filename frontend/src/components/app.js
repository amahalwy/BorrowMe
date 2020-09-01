import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch, Redirect, Route } from "react-router-dom";
import NavBar from "./nav/navbar";

import MainPage from "./main/main_page";
import LoginForm from "./session/login_form";
import SignupForm from "./session/signup_form";
import Home from './home/home';
import PostingIndex from "./postings/postings_index";

const App = () => (
  <div className="site-body">
    <NavBar />
    <Switch>
      <AuthRoute exact path="/" component={MainPage} />
      <AuthRoute exact path="/login" component={LoginForm} />
      <AuthRoute exact path="/signup" component={SignupForm} />
      <Route exact path="/home" component={Home} />      

      
      <ProtectedRoute exact path="/postings" component={PostingIndex}/>

      <Redirect to='/home' />
    </Switch>
  </div>
);

export default App;
