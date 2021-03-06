/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
const baseUrl = "http://localhost:9000/api/friends";

//dupe from userPosts service
let token = null;

//dupe from userPosts service
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const showReceivedFriendRequests = async (id) => {
  const response = await axios.get(`${baseUrl}/receivedFriendReqs/${id}`);
  return response.data;
};

const showFriends = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

//@todo this was not working as a get request. research it.
const showStatus = async (authUserId, profileUserId) => {
  const response = await axios.post(`${baseUrl}/friendStatus`, {
    data: { authUserId: authUserId, profileUserId: profileUserId },
  });
  return response.data;
};

const sendFriendRequest = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(
    `${baseUrl}/friendReq`,
    { data: { id: id } },
    config
  );
  return response.data;
};

//@todo some duplication here. refactor somehow
const acceptFriendRequest = async (requester, recipient) => {
  const response = await axios.post(`${baseUrl}/acceptReq`, {
    data: { requester: requester, recipient: recipient },
  });
  return response.data;
};

const rejectFriendRequest = async (requester, recipient) => {
  const response = await axios.post(`${baseUrl}/rejectReq`, {
    data: { requester: requester, recipient: recipient },
  });
  return response.data;
};

export default {
  sendFriendRequest,
  showFriends,
  showReceivedFriendRequests,
  showStatus,
  acceptFriendRequest,
  rejectFriendRequest,
  setToken,
};
