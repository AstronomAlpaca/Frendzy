import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

import LoginForm from "./components/LoginForm/LoginForm";

import loginService from "./services/login";
import userPostService from "./services/userPosts";
import friendService from "./services/friends";

import Dashboard from "./views/Dashboard/Dashboard";
import UserProfile from "./views/UserProfile/UserProfile";
import Notifications from "./views/Notifications/Notifications";

const App = () => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  // Here the app checks if user details of a logged-in user
  // can already be found on local storage. If true,
  // details are saved to app state and to the service.

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      // this whole function is just checking if there's an auth token, if so, set it to the services
      userPostService.setToken(user.token);
      friendService.setToken(user.token); // this wasn't here before, this is why the token was null!!!!!!!!!!!!!!!!!!!
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      // Saving to localStorage will prevent the app from re-rendering
      // and losing login data
      window.localStorage.setItem("loggedAppUser", JSON.stringify(user));
      // need to set token here in all services, so that app knows it is the auth user who sent a request or action
      userPostService.setToken(user.token);
      friendService.setToken(user.token);
      setUser(user);
      setusername("");
      setPassword("");
    } catch (exception) {
      // setErrorMessage - @todo
      alert("Incorrect credentials");
      setTimeout(() => {
        //setErrorMessage(null) - @todo
      }, 5000);
    }
  };

  const padding = {
    padding: 5,
  };

  return (
    <div>
      {user === null ? (
        <LoginForm
          username={username}
          password={password}
          handleusernameChange={({ target }) => setusername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        ></LoginForm>
      ) : (
        <div>
          <nav>
            <Link style={padding} to="/">
              Home
            </Link>
            <Link style={padding} to={`/${user.username}`}>
              {user.first_name} {user.surname}
            </Link>
            <Link style={padding} to={"/notifications"}>
              {/* @todo make it reactive, show number of notifications */}
              Notifications
            </Link>
          </nav>

          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path={`/:userName`} element={<UserProfile />}></Route>
            <Route
              path={"/notifications"}
              element={<Notifications userData={user} />}
            ></Route>
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
