/* eslint-disable no-unused-vars */
const User = require("../models/user.model");
const Friends = require("../models/friends.model");
const jwt = require("jsonwebtoken");

// dupe from userPosts controller
const getTokenFrom = (req) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

const sendFriendRequest = async (req, res, next) => {
  //dupe from userPosts controller
  const token = getTokenFrom(req);
  // The object decoded from the token contains the username and user id fields,
  // which tells the server who made the request. See userLogin() for details
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id || !token) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  //userA is the requester (authorised user)
  const userA = await User.findById(decodedToken.id);
  //userB will be the recipient, received from frontend
  const userB = await User.findById(req.body.data.id);

  //console.log("userA: ", userA);
  //console.log("userB: ", userB);
  // console.log("request body: ", req.body.data.id);

  const docA = await Friends.findOneAndUpdate(
    {
      requester: userA,
      recipient: userB,
    },
    {
      $set: { status: 1 }, // requested, from userB perspective
    },
    {
      upsert: true,
      new: true,
    }
  );
  const docB = await Friends.findOneAndUpdate(
    {
      recipient: userA,
      requester: userB,
    },
    {
      $set: { status: 2 }, // pending, from userA perspective
    },
    { upsert: true, new: true }
  );
  const updateUserA = await User.findOneAndUpdate(
    { _id: userA },
    { $push: { friends: docA._id } }
  );
  const updateUserB = await User.findOneAndUpdate(
    { _id: userB },
    { $push: { friends: docB._id } }
  );

  // console.log(docA);
  // console.log(docB);

  res.json(docB);
};

module.exports = {
  sendFriendRequest,
};
