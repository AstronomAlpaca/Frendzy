/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
const baseUrl = "http://localhost:9000/api/friends/friendReq";

//dupe from userPosts service
let token = null;

// let token = JSON.parse(window.localStorage.getItem("loggedAppUser"));

//dupe from userPosts service
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const sendFriendRequest = async () => {
  //   const config = {
  //     headers: { Authorization: token },
  //   };

  console.log("sendFriendRequest token: ", token);

  //const response = await axios.post(baseUrl, config);
  //return response.data;
};

export default { sendFriendRequest, setToken };
