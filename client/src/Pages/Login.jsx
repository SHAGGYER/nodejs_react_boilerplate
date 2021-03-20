import React, { useState } from "react";
import classnames from "classnames";
import HttpClient from "../Services/HttpClient";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});

  const onSubmit = async (event) => {
    event.preventDefault();
    setError({});

    const body = {
      email,
      password,
    };

    try {
      await HttpClient().post("/api/auth/login", body);
      window.location = "/";
    } catch (e) {
      if (e.response.status === 400) {
        setError(e.response.data.errors);
      }
    }
  };
  return (
    <div className="container">
      <h1 className="display-3">Login</h1>
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
        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};
