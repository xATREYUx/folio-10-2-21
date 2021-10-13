// import axios from "axios";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import AuthContext from "../auth/authContext";
import domain from "../../util/domain";
// import { createUser, loginUser } from "./authActions";
// import { AuthFormContainer } from "./auth-form-styles";
// import Button from "../form-elements/button";
import FormErrors from "../form-elements/formErrors";

const LoginForm = () => {
  const { getLoggedIn, loggedIn, loginUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const history = useHistory();

  const login = async (e) => {
    e.preventDefault();
    try {
      const loginData = {
        email,
        password,
      };
      const loginRes = await loginUser(loginData);
      if (loginRes != "Login successfull") {
        const error = FormErrors(loginRes);
        setLoginError(error);
      }
      history.push("/user");
    } catch (err) {
      console.log("Error in login function", err);
    }
    getLoggedIn();
  };

  return (
    <div>
      <form onSubmit={login} className="auth-form">
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <div>{loginError}</div>
        <button type="submit">Login</button>
        {/* <div id="error"></div> */}
      </form>
    </div>
  );
};

export default LoginForm;
