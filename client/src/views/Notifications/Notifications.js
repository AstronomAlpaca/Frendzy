/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";

import friendService from "../../services/friends";

const Notifications = (props) => {
  const [receivedFriendReqs, setReceivedFriendReqs] = useState([{}]);

  const [{ _id, requester }] = receivedFriendReqs;

  useEffect(() => {
    friendService
      .showReceivedFriendRequests(props.userData.id)
      .then((response) => {
        setReceivedFriendReqs(response);
      });
  }, [props.userData.id]);

  return (
    <div>
      <h1>Received Friend Requests</h1>
      <ul>
        {receivedFriendReqs.map(() => (
          <li key={_id}>
            {requester} sent you a friend request.
            <button>Accept</button>
            <button>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
