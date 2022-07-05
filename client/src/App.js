import { useState, useEffect } from "react";

import UserPost from "./components/UserPost/UserPost";
import loginService from "./services/login";
import userPostService from "./services/userPosts";

const App = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [newUserPost, setNewUserPost] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    userPostService.getAll().then((initialUserPosts) => {
      setUserPosts(initialUserPosts);
    });
  }, []);
  // Quick note: Empty array in second param ensures that the
  // effect is executed only when the component is rendered
  // for the FIRST TIME.

  // Here the app checks if user details of a logged-in user
  // can already be found on local storage. If true,
  // details are saved to app state and to the service.
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      userPostService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ email, password });

      // Saving to localStorage will prevent the app from re-rendering
      // and losing login data
      window.localStorage.setItem("loggedAppUser", JSON.stringify(user));
      userPostService.setToken(user.token);
      setUser(user);
      setEmail("");
      setPassword("");
    } catch (exception) {
      // setErrorMessage - todo
      alert("Incorrect credentials");
      setTimeout(() => {
        //setErrorMessage(null) - todo
      }, 5000);
    }
  };

  const addUserPost = (event) => {
    event.preventDefault();
    const userPostObject = {
      content: newUserPost,
      date: new Date().toISOString(),
      id: userPosts.length + 1,
    };

    userPostService.create(userPostObject).then((returnedUserPost) => {
      setUserPosts(userPosts.concat(returnedUserPost));
      setNewUserPost("");
    });
  };

  const handleUserPostChange = (event) => {
    setNewUserPost(event.target.value);
  };

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          Email
          <input
            type="email"
            value={email}
            name="Email"
            onChange={({ target }) => setEmail(target.value)}
          />
        </div>
        <div>
          Password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    );
  };

  return (
    <div>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>
            Hello, {user.first_name} {user.surname}!
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
