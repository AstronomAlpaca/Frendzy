import friendService from "../../services/friends";

const ReceivedFriendRequest = (props) => {
  const handleAcceptRequest = () => {
    friendService.acceptFriendRequest(props.requester, props.recipient);
  };

  const handleRejectRequest = () => {
    friendService.rejectFriendRequest(props.requester, props.recipient);
  };

  return (
    <li>
      {props.requester} sent you a friend request.
      {/* 
      @todo when either button is clicked, hide request (maybe change state of parent [notifications view])
       */}
      <button onClick={handleAcceptRequest}>Accept</button>
      <button onClick={handleRejectRequest}>Reject</button>
    </li>
  );
};

export default ReceivedFriendRequest;
