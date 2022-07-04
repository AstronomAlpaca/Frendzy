const express = require("express");
const userPostsRouter = express.Router();
const {
  createUserPost,
  returnAllUserPosts,
} = require("../controllers/userPosts.controller");

userPostsRouter.get("/", returnAllUserPosts);
userPostsRouter.post("/", createUserPost);

module.exports = userPostsRouter;
