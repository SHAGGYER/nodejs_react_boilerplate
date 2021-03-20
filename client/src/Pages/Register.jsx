import React, { useContext, useState } from "react";
import HttpClient from "../Services/HttpClient";
import classnames from "classnames";
import AppContext from "../Contexts/AppContext";

export default () => {
  const { redirect } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [error, setError] = useState({});

  const onSubmit = async (event) => {
    event.preventDefault();
    setError({});

    const body = {
      email,
      password,
      passwordAgain,
    };

    try {
      await HttpClient().post("/api/auth/register", body);
      redirect("/auth/login");
    } catch (e) {
      if (e.response.status === 400) {
        setError(e.response.data.errors);
      }
    }
  };

  return (
    <div className="container">
      <h1 className="display-3">Create Account</h1>
      <form onSubmit={onSubmit}>
        <article className="form-group">
          <label>Email</label>
          <input
            className={classnames("form-control", {
              "is-invalid": !!error.email,
            })}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter Email"
          />
          <div className="invalid-feedback">{error.email}</div>
        </article>
        <article className="form-group">
          <label>Password</label>
          <input
            className={classnames("form-control", {
              "is-invalid": !!error.password,
            })}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter Password"
          />
          <div className="invalid-feedback">{error.password}</div>
        </article>
        <article className="form-group">
          <label>Password Again</label>
          <input
            className={classnames("form-control", {
              "is-invalid": !!error.passwordAgain,
            })}
            value={passwordAgain}
            onChange={(e) => setPasswordAgain(e.target.value)}
            type="password"
            placeholder="Enter Password Again"
          />
          <div className="invalid-feedback">{error.passwordAgain}</div>
        </article>
        <button className="btn btn-primary">Create Account</button>
      </form>
    </div>
  );
};
