/* eslint-disable no-unused-vars */
const User = require("../models/user.model");
const UserPost = require("../models/userPost.model");
const jwt = require("jsonwebtoken");

const getTokenFrom = (req) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

const returnAllUserPosts = async (req, res) => {
  const userPosts = await UserPost.find({}).populate("user", { username: 1 });

  res.json(userPosts);
};

const createUserPost = async (req, res, next) => {
  const body = req.body;
  const token = getTokenFrom(req);
  // The object decoded from the token contains the username and user id fields,
  // which tells the server who made the request. See userLogin() for details
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id || !token) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(decodedToken.id);

  const userPost = new UserPost({
    content: body.content,
    date: new Date(),
    user: user._id,
  });

  const savedUserPost = await userPost.save();
  user.userPosts = user.userPosts.concat(savedUserPost._id);
  // id of the post is saved in the user posts field
  await user.save();

  res.json(savedUserPost);
};

module.exports = {
  createUserPost,
  returnAllUserPosts,
};
