/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import UserPost from "../../components/UserPost/UserPost";

import userService from "../../services/users";
import friendService from "../../services/friends";

const UserProfile = () => {
  const [theUser, setTheUser] = useState([{}]);
  const [friendStatus, setFriendStatus] = useState(0); // @todo auth user should not see this on their own profile. pass userData from App.js to here and use as prop, conditonal render
  const [friendsOfUser, setFriendsOfUser] = useState([]);
  const params = useParams();

  // Had trouble here. Seems I needed to use [{}]. TODO Look more into destructuring
  const [{ first_name, surname, id, userPosts }] = theUser;

  useEffect(() => {
    userService.getUser(params.userId).then((user) => {
      setTheUser(user);
    });
  }, [params.userId]);

  // Gets friends of theUser
  useEffect(() => {
    // Backend was throwing castErrors. Apparently "id" here was undefined.
    // Makes sense to check that id exists before making this async call.
    // Give the other async call time to set state and create id.
    if (id) {
      // userPostService.getPostsByUser(id).then((posts) => {
      //   setPostsByUser(posts);
      // });
      //@todo could potentially just use friends from theUser state instead - review
      friendService.showFriends(id).then((friendList) => {
        setFriendsOfUser(friendList);
      });
    }
  }, [id]);

  const handleSendRequest = () => {
    friendService.sendFriendRequest(id).then((response) => {
      setFriendStatus(response.status);
      // @todo state needs to be persistent. it is resetting back to 0 on refresh.
      // see comment below at button onClick
    });
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
