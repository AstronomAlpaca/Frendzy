const express = require("express");
const friendsRouter = express.Router();
const {
  showReceivedFriendRequests,
  sendFriendRequest,
} = require("../controllers/friends.controller");

friendsRouter.get("/receivedFriendReqs/:userId", showReceivedFriendRequests);
friendsRouter.post("/friendReq", sendFriendRequest);

module.exports = friendsRouter;
