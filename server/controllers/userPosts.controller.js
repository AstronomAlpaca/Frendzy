/* eslint-disable no-unused-vars */
const User = require("../models/user.model");
const UserPost = require("../models/userPost.model");

const returnAllUserPosts = async (req, res) => {
  const userPosts = await UserPost.find({}).populate("user", { email: 1 });

  res.json(userPosts);
};

const createUserPost = async (req, res, next) => {
  const body = req.body;

  const user = await User.findById(body.userId);

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
