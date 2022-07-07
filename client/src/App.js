import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm/LoginForm";
import UserPostForm from "./components/UserPostForm/UserPostForm";
import UserPost from "./components/UserPost/UserPost";
import loginService from "./services/login";
import userPostService from "./services/userPosts";

const App = () => {
  const [userPosts, setUserPosts] = useState([]);
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

  const addUserPost = (postObject) => {
    userPostService.create(postObject).then((returnedUserPost) => {
      setUserPosts(userPosts.concat(returnedUserPost));
    });
  };

  return (
    <div>
      {user === null ? (
        <LoginForm
          email={email}
          password={password}
          handleEmailChange={({ target }) => setEmail(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        ></LoginForm>
      ) : (
        <div>
          <p>
            Hello, {user.first_name} {user.surname}!
          </p>
          <UserPostForm createPost={addUserPost}></UserPostForm>
        </div>
      )}
      <div>
        {userPosts.map((post) => (
          <UserPost key={post.id} content={post.content}></UserPost>
        ))}
      </div>
    </div>
  );
};

export default App;
