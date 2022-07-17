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

const showFriends = async (req, res) => {
  const userId = req.params.userId;
  const theirFriends = await Friends.find({
    recipient: userId,
    // status: 3,
  });

  res.json(theirFriends);
};

const showReceivedFriendRequests = async (req, res) => {
  const userId = req.params.userId;
  const recReqs = await Friends.find({
    recipient: userId,
    status: 1,
  });

  res.json(recReqs);
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
  //I think these two are here just incase the request gets rejected, otherwise there's no way of handling it
  //@todo may also need to add the validation here to prevent duplicates
  const updateUserA = await User.findOneAndUpdate(
    { _id: userA },
    { $push: { friends: docA._id } }
  );
  const updateUserB = await User.findOneAndUpdate(
    { _id: userB },
    { $push: { friends: docB._id } }
  );

  res.json(docB);
};

//@todo some duplication here. refactor somehow
const acceptFriendRequest = async (req, res, next) => {
  const userA = req.body.data.requester;
  const userB = req.body.data.recipient;
  // does not change status if 'await' keyword is not used
  await Friends.findOneAndUpdate(
    {
      requester: userA,
      recipient: userB,
    },
    {
      $set: { status: 3 },
    }
  );

  await Friends.findOneAndUpdate(
    {
      recipient: userA,
      requester: userB,
    },
    {
      $set: { status: 3 },
    }
  );

  //@todo send some kind of confirmation to requester, somehow
  // (if friends array in model DB has grown, do something)
  res.send("ok");
};

const rejectFriendRequest = async (req, res, next) => {
  const userA = req.body.data.requester;
  const userB = req.body.data.recipient;

  const docA = await Friends.findOneAndRemove({
    requester: userA,
    recipient: userB,
  });

  const docB = await Friends.findOneAndRemove({
    recipient: userA,
    requester: userB,
  });

  const updateUserA = await User.findOneAndUpdate(
    { _id: userA },
    { $pull: { friends: docA._id } }
  );
  const updateUserB = await User.findOneAndUpdate(
    { _id: userB },
    { $pull: { friends: docB._id } }
  );

  res.send("ok");
};

module.exports = {
  showFriends,
  showReceivedFriendRequests,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
};
