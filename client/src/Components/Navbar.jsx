import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../Contexts/AppContext";

export default () => {
  const { user, logout } = useContext(AppContext);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="#">
          Container
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample07"
          aria-controls="navbarsExample07"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample07">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Link
              </a>
            </li>
            {!user ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Account
                </a>
                <div className="dropdown-menu">
                  <Link className="dropdown-item" to="/auth/login">
                    Login
                  </Link>
                  <Link to="/auth/register" className="dropdown-item">
                    Create Account
                  </Link>
                  <a className="dropdown-item" href="#">
                    Forgot Password
                  </a>
                </div>
              </li>
            ) : (
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={logout}>
                  Logout
                </a>
              </li>
            )}
          </ul>
          <form className="form-inline my-2 my-md-0">
            <input
              className="form-control"
              type="text"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
        </div>
      </div>
    </nav>
  );
};
