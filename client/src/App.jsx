import React, { useEffect, useState } from "react";
import {
  Switch,
  Route,
  Redirect,
  useHistory,
  withRouter,
} from "react-router-dom";

// Services
import HttpClient from "./Services/HttpClient";

// Contexts
import AppContext from "./Contexts/AppContext";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import Register from "./Pages/Register";
import Login from "./Pages/Login";

function App({ location }) {
  const history = useHistory();
  const [initialized, setInitialized] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    const { data } = await HttpClient().get("/api/auth/init");
    if (data.user) {
      setUser(data.user);
    }
    setInitialized(true);
  };

  function logout() {
    window.location.href = "/api/auth/logout";
  }

  const redirect = (path, external = false) => {
    if (!external) {
      console.log(path);
      history.push(path);
      const navbar = document.getElementById("navbar");
      if (navbar) {
        navbar.scrollIntoView();
      }
    } else {
      window.open(path, "_blank");
    }
  };

  return (
    <>
      {initialized && (
        <AppContext.Provider
          value={{
            user,
            setUser,
            logout,
            redirect,
          }}
        >
          <Navbar />
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>

            <Route path="/auth/register">
              <Register />
            </Route>
            <Route path="/auth/login">
              <Login />
            </Route>
          </Switch>
        </AppContext.Provider>
      )}
    </>
  );
}

export default withRouter(App);
