const express = require("express");
const friendsRouter = express.Router();
const { sendFriendRequest } = require("../controllers/friends.controller");

friendsRouter.post("/friendReq", sendFriendRequest);

module.exports = friendsRouter;
