import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

import { useAuth } from "../utils/auth";
import FullPageSpinner from "../components/FullPageSpinner";
import LoginAlert from "../components/LoginAlert";
import {
  EmailInputGroup,
  PasswordInputGroup,
  CompanyCodeInputGroup
} from "../components/FormControls";

const Login = () => {
  const { login, isPending, isLoggedIn, isBoss, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companycode, setCompanyCode] = useState("");
  const handleSubmit = e => {
    e.preventDefault();
    login(email, password, companycode);
  };

  if (isLoggedIn) {
    if (isBoss) {
      return <Redirect to="/boss" />;
    } else {
      return <Redirect to="/employee" />;
    }
  }

  if (isPending) {
    return <FullPageSpinner text="Verifying account..." />;
  }

  return (
    <div className="container vh-100 text-center d-flex align-items-center flex-column">
      <form className="form-login m-auto" onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <EmailInputGroup
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <PasswordInputGroup
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <CompanyCodeInputGroup
          required
          value={companycode}
          onChange={e => setCompanyCode(e.target.value)}
        />
        <button type="submit" className="my-3 btn btn-lg btn-primary btn-block">
          Log In
        </button>
        <div>
          <Link to="/company">Create an account</Link>
        </div>
        {error && <LoginAlert error={error} />}
      </form>
    </div>
  );
};

export default Login;
