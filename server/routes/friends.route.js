const express = require("express");
const friendsRouter = express.Router();
const {
  showStatus,
  showFriends,
  showReceivedFriendRequests,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
} = require("../controllers/friends.controller");

friendsRouter.get("/:userId", showFriends);
friendsRouter.get("/receivedFriendReqs/:userId", showReceivedFriendRequests);
friendsRouter.post("/friendStatus", showStatus);
friendsRouter.post("/friendReq", sendFriendRequest);
friendsRouter.post("/acceptReq", acceptFriendRequest);
friendsRouter.post("/rejectReq", rejectFriendRequest);

module.exports = friendsRouter;
