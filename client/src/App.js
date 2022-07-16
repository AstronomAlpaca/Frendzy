import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import LoginForm from "./components/LoginForm/LoginForm";
//import UserPostForm from "./components/UserPostForm/UserPostForm";
// import UserPost from "./components/UserPost/UserPost";
import loginService from "./services/login";
import userPostService from "./services/userPosts";
import friendService from "./services/friends";

import Dashboard from "./views/Dashboard/Dashboard";
import UserProfile from "./views/UserProfile/UserProfile";
// import LoginPage from "./views/LoginPage/LoginPage";

const App = () => {
  // const [userPosts, setUserPosts] = useState([]);
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  // This is not actually what's desired
  // useEffect(() => {
  //   userPostService.getAll().then((initialUserPosts) => {
  //     setUserPosts(initialUserPosts);
  //   });
  // }, []);
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
      // setErrorMessage - todo
      alert("Incorrect credentials");
      setTimeout(() => {
        //setErrorMessage(null) - todo
      }, 5000);
    }
  };

  // const addUserPost = (postObject) => {
  //   userPostService.create(postObject).then((returnedUserPost) => {
  //     setUserPosts(userPosts.concat(returnedUserPost));
  //   });
  // };

  const padding = {
    padding: 5,
  };

  return (
    <div>
      {user === null ? (
        // <Routes>
        //   <Route path="/" element={<LoginPage />}></Route>
        // </Routes>
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
          </nav>

          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            {/* 
            This is wrong. It shouldn't be "user".
            Think about what happens if you visit a friend's profile.
            Maybe this should be a backend route?
            */}
            {/* 
            Max: "Can either be fetched from a backend API, a database or from
            application-wide state which we manage with React Context or Redux"
             */}
            <Route path={`/:userName`} element={<UserProfile />}></Route>
          </Routes>

          {/* 
          <div>
            <p>
              Hello, {user.first_name} {user.surname}!
            </p>
            <UserPostForm createPost={addUserPost}></UserPostForm>
            <div>
              
               {userPosts.map((post) => (
                <UserPost key={post.id} content={post.content}></UserPost>
              ))} 
            </div>
          </div> 
          */}
        </div>
      )}
    </div>
  );
};

export default App;
