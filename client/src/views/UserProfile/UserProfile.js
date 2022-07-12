import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import userService from "../../services/users";

const UserProfile = () => {
  const [theUser, setTheUser] = useState("");
  const params = useParams();

  useEffect(() => {
    userService.getUser(params.userName).then((user) => {
      setTheUser(user);
    });
  }, [params.userName]);

  if (!theUser) return null;
  return (
    <div>
      <h1>{theUser[0].first_name}</h1>
      <p>Posts by:</p>
      <ul></ul>
    </div>
  );
};

export default UserProfile;
