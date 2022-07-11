import { useState, useEffect } from "react";
import userPostService from "../../services/userPosts";

import UserPost from "../../components/UserPost/UserPost";

const UserProfile = (props) => {
  const [postsByUser, setPostsByUser] = useState([]);

  useEffect(() => {
    userPostService.getPostsByUser(props.user.id).then((initialPosts) => {
      setPostsByUser(initialPosts);
    });
  }, [props.user.id]);

  return (
    <div>
      <h1>
        {props.user.first_name} {props.user.surname}
      </h1>
      <p>Posts by {props.user.first_name}:</p>
      <ul>
        {postsByUser.map((post) => (
          <UserPost key={post.id} content={post.content}></UserPost>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;
