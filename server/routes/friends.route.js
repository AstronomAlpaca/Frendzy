const express = require("express");
const friendsRouter = express.Router();
const {
  showReceivedFriendRequests,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
} = require("../controllers/friends.controller");

friendsRouter.get("/receivedFriendReqs/:userId", showReceivedFriendRequests);
friendsRouter.post("/friendReq", sendFriendRequest);
friendsRouter.post("/acceptReq", acceptFriendRequest);
friendsRouter.post("/rejectReq", rejectFriendRequest);

module.exports = friendsRouter;
