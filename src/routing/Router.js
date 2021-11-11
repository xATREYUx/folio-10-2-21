import React, { useContext, useEffect } from "react";
// import { AppContainer } from "../shared/shared.styles";
import AuthContext from "../components/auth/authContext";

import { PrivateRoute, AuthRoute } from "../routing/PrivateRoute";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import HomePage from "../pages/homePage";
import UserPage from "../pages/userPage";
import Register from "../components/auth/register";
// import NavBar from "../components/navBar/NavBar";
// import PostPage from "../pages/postPage";
import AuthPage from "../pages/authPage";

import NavBar from "../components/navbar";
import PostPage from "../pages/postPage";
import ScrollToTop from "./scrollToTop";

const Router = () => {
  const { loggedIn, getLoggedIn } = useContext(AuthContext);
  {
    loggedIn && console.log("Router loggedIn: ", loggedIn);
  }
  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <ScrollToTop />
        <Switch>
          <AuthRoute path="/auth" component={AuthPage} />
          {/* <AuthRoute path="/register" component={Register} /> */}
          {/* <AuthRoute path="/register" component={Register} auth={loggedIn} /> */}
          <PrivateRoute path="/user" component={UserPage} />
          <Route path="/post/:id" component={PostPage} />
          <Route path="*" component={HomePage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Router;
