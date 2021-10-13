import { defaults } from "js-cookie";
import React from "react";
import LoginForm from "../components/auth/login";
import RegisterForm from "../components/auth/register";
// import { AuthPageContainer } from "./auth-page-styles";

const AuthPage = () => {
  return (
    <div id="auth-page-container">
      <LoginForm />
      <RegisterForm />
    </div>
  );
};

export default AuthPage;
