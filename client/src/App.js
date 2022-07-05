import React, { useState, useEffect } from "react";
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

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ email, password });

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
