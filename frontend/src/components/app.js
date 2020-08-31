import React from "react";
import { AuthRoute } from "../util/route_util";
import { Switch } from "react-router-dom";
import NavBar from "./nav/navbar";

import MainPage from "./main/main_page";
import LoginForm from "./session/login_form";
import SignupForm from "./session/signup_form";

const App = () => (
  <div>
    <NavBar />
    <Switch>
      <AuthRoute exact path="/" component={MainPage} />
      <AuthRoute exact path="/login" component={LoginForm} />
      <AuthRoute exact path="/signup" component={SignupForm} />
    </Switch>
  </div>
);

export default App;
