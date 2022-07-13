import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserPost from "../../components/UserPost/UserPost";
import userService from "../../services/users";
import userPostService from "../../services/userPosts";

const UserProfile = () => {
  const [theUser, setTheUser] = useState([{}]);
  const [postsByUser, setPostsByUser] = useState([]);
  const params = useParams();

  // Had trouble here. Seems I needed to use [{}]. TODO Look more into destructuring
  const [{ first_name, surname, id }] = theUser;

  useEffect(() => {
    userService.getUser(params.userName).then((user) => {
      setTheUser(user);
    });
  }, [params.userName]);

  useEffect(() => {
    // Backend was throwing castErrors. Apparently "id" here was undefined.
    // Makes sense to check that id exists before making this async call.
    // Give the other async call time to set state and create id.
    if (id) {
      userPostService.getPostsByUser(id).then((posts) => {
        setPostsByUser(posts);
      });
    }
  }, [id]);

  if (!theUser) return null;
  return (
    <div>
      <h1>
        {first_name} {surname}
      </h1>
      <p>Posts by {first_name}:</p>
      <ul>
        {postsByUser.map((post) => (
          <UserPost key={post.id} content={post.content}></UserPost>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;
