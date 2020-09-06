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
import Profile from './user/profile';
// import CreatePosting from './postings/create_posting';
// import Testing from './testing/new_upload';

import Map from "./map/map.jsx"

const App = () => (
  <div className="site-body">
    <NavBar />
    <Switch>
      <AuthRoute exact path="/" component={MainPage} />
      <AuthRoute exact path="/login" component={LoginForm} />
      <AuthRoute exact path="/signup" component={SignupForm} />
      <ProtectedRoute exact path="/home" component={HomePage} />
      <ProtectedRoute exact path="/profile/:userId" component={Profile} />
      <ProtectedRoute exact path="/postings" component={PostingIndex} />
      <ProtectedRoute exact path="/map" component={Map} />
      <Route exact path="/calendar" component={Calendar} />
      {/* <Route exact path="/testing" component={Testing} /> */}

      <Redirect to="/" />
    </Switch>
  </div>
);

export default App;
