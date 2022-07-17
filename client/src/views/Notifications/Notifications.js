/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";

import friendService from "../../services/friends";

import ReceivedFriendRequest from "../../components/ReceivedFriendRequest/ReceivedFriendRequest.js";

const Notifications = (props) => {
  const [receivedFriendReqs, setReceivedFriendReqs] = useState([{}]);

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
        {receivedFriendReqs.map((request) => (
          <ReceivedFriendRequest
            key={request._id}
            recipient={request.recipient}
            requester={request.requester.id}
            first_name={request.requester.first_name}
            surname={request.requester.surname}
            username={request.requester.username}
          ></ReceivedFriendRequest>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
