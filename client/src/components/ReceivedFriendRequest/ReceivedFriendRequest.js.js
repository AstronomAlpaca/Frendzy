import friendService from "../../services/friends";

const ReceivedFriendRequest = (props) => {
  const handleAcceptRequest = () => {
    friendService.acceptFriendRequest(props.requester, props.recipient);
  };

  return (
    <li>
      {props.requester} sent you a friend request.
      <button onClick={handleAcceptRequest}>Accept</button>
      <button>Reject</button>
    </li>
  );
};

export default ReceivedFriendRequest;
