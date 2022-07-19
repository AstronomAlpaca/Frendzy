/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import UserPost from "../../components/UserPost/UserPost";

import userService from "../../services/users";
import friendService from "../../services/friends";

const UserProfile = (props) => {
  const [theUser, setTheUser] = useState([{}]);
  const [friendStatus, setFriendStatus] = useState(""); // @todo auth user should not see this on their own profile. pass userData from App.js to here and use as prop, conditonal render
  const [friendsOfUser, setFriendsOfUser] = useState([]);
  const params = useParams();

  const [{ first_name, surname, id, userPosts }] = theUser;

  useEffect(() => {
    userService.getUser(params.userId).then((user) => {
      setTheUser(user);
    });
  }, [params.userId]);

  useEffect(() => {
    if (id) {
      friendService.showFriends(id).then((friendList) => {
        setFriendsOfUser(friendList);
      });
    }
  }, [id]);

  useEffect(() => {
    if (props.userData.id !== id)
      friendService.showStatus(props.userData.id, id).then((response) => {
        switch (response) {
          case 0:
            setFriendStatus("Send friend request");
            break;
          case 1:
            setFriendStatus("Pending");
            break;
          case 2:
            setFriendStatus("Accept friend request");
            break;
          case 3:
            setFriendStatus("Friends");
            break;
          default:
            setFriendStatus("Send friend request");
        }
      });
  }, [id, props.userData.id]);

  const handleSendRequest = () => {
    friendService.sendFriendRequest(id).then(setFriendStatus("Pending"));
  };

  const filteredFriends = friendsOfUser.filter((friend) => {
    return friend.status === 3;
  });

  if (!theUser || !userPosts) return null;
  return (
    <div>
      <h1>
        {first_name} {surname}
      </h1>
      {props.userData.id !== id ? (
        <button onClick={handleSendRequest}>{friendStatus}</button>
      ) : null}
      <p>Posts by {first_name}:</p>
      <ul>
        {userPosts.map((post) => (
          <UserPost key={post.id} content={post.content}></UserPost>
        ))}
      </ul>
      <p>{first_name}'s Friends:</p>
      <ul>
        {filteredFriends.map((friend) => (
          <Link key={friend._id} to={`/${friend.requester.id}`}>
            <li>
              {friend.requester.first_name} {friend.requester.surname}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;
