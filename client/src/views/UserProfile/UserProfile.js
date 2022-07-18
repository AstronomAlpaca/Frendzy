/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import UserPost from "../../components/UserPost/UserPost";

import userService from "../../services/users";
import friendService from "../../services/friends";

const UserProfile = (props) => {
  const [theUser, setTheUser] = useState([{}]);
  const [friendStatus, setFriendStatus] = useState(0); // @todo auth user should not see this on their own profile. pass userData from App.js to here and use as prop, conditonal render
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
      friendService.showStatus(props.userData.id, id).then((response) => {
        console.log(response);
      });
    }
  }, [id, props.userData.id]);

  //return status of friendship between authUser and profile user

  const handleSendRequest = () => {
    friendService.sendFriendRequest(id).then(setFriendStatus(2));
    // @todo state needs to be persistent. it is resetting back to 0 on refresh.
    // see comment below at button onClick
  };

  // @todo map entire friends db and filter different statuses for different tabs (friendlist, received requests, sent requests)
  const filteredFriends = friendsOfUser.filter((friend) => {
    return friend.status === 3;
  });

  if (!theUser || !userPosts) return null;
  return (
    <div>
      <h1>
        {first_name} {surname}
      </h1>
      {/* 
      @todo when clicked, just change inner text on front end while
      fetching actual status from backend, then update with backend data
      */}
      <button onClick={handleSendRequest}>{friendStatus}</button>
      <p>Posts by {first_name}:</p>
      <ul>
        {userPosts.map((post) => (
          <UserPost key={post.id} content={post.content}></UserPost>
        ))}
      </ul>
      <p>{first_name}'s Friends:</p>
      <ul>
        {filteredFriends.map((friend) => (
          // @todo using recipient in showFriends controller function,
          // so use requester here to show other party
          // should work on both sides. review
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
