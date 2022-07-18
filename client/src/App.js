import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

import LoginForm from "./components/LoginForm/LoginForm";
import UserPostForm from "./components/UserPostForm/UserPostForm";

import loginService from "./services/login";
import userPostService from "./services/userPosts";
import friendService from "./services/friends";

import Dashboard from "./views/Dashboard/Dashboard";
import UserProfile from "./views/UserProfile/UserProfile";
import Notifications from "./views/Notifications/Notifications";

const App = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      userPostService.setToken(user.token);
      friendService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedAppUser", JSON.stringify(user));
      userPostService.setToken(user.token);
      friendService.setToken(user.token);
      setUser(user);
      setusername("");
      setPassword("");
    } catch (exception) {
      alert("Incorrect credentials");
      setTimeout(() => {}, 5000);
    }
  };

  const addUserPost = (postObject) => {
    userPostService.create(postObject).then((returnedUserPost) => {
      setUserPosts(userPosts.concat(returnedUserPost));
    });
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
            <Link style={padding} to={`/${user.id}`}>
              {user.first_name} {user.surname}
            </Link>
            <Link style={padding} to={"/notifications"}>
              Notifications
            </Link>
            <UserPostForm createPost={addUserPost}></UserPostForm>
          </nav>

          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path={`/:userId`} element={<UserProfile />}></Route>
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
