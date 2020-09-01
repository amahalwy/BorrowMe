import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch, Redirect, Route } from "react-router-dom";
import NavBar from "./nav/navbar";

import MainPage from "./main/main_page";
import LoginForm from "./session/login_form";
import SignupForm from "./session/signup_form";
import PostingIndex from "./postings/postings_index";
import HomePage from "./home/home_page";
import Calendar from "./calendar/calendar";


const App = () => (
  <div className="site-body">
    <NavBar />
    <Switch>
      <AuthRoute exact path="/" component={MainPage} />
      <AuthRoute exact path="/login" component={LoginForm} />
      <AuthRoute exact path="/signup" component={SignupForm} />
      <Route exact path="/home" component={HomePage} />
      <Route exact path="/calendar" component={Calendar} />

      <ProtectedRoute exact path="/postings" component={PostingIndex} />

      <Redirect to="/home" />
    </Switch>
  </div>
);

export default App;
