import { useEffect, useState } from "react";
import userPostService from "../../services/userPosts";

import UserPost from "../../components/UserPost/UserPost";

const UserProfile = (props) => {
  const [postsByUser, setPostsByUser] = useState([]);

  // Very broken. Todo...
  // useEffect(() => {
  //   userPostService.getPostsByUser(props.user.id).then((initialPosts) => {
  //     setPostsByUser(initialPosts);
  //   });
  // });

  useEffect(() => {
    userPostService.getAll().then((initialUserPosts) => {
      setPostsByUser(initialUserPosts);
    });
  }, []);

  // Front end method - definitely not ideal, but backend option is breaking atm
  const filteredPosts = postsByUser.filter((post) => {
    return post.user.id === props.user.id;
  });

  return (
    <div>
      <h1>User Profile</h1>
      <p>Posts by {props.user.first_name}:</p>
      <ul>
        {filteredPosts.map((post) => (
          <UserPost key={post.id} content={post.content}></UserPost>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;
