const express = require("express");
const userPostsRouter = express.Router();
const {
  createUserPost,
  returnAllUserPosts,
  returnAllPostsByUser,
} = require("../controllers/userPosts.controller");

userPostsRouter.get("/", returnAllUserPosts);
userPostsRouter.get("/:userId", returnAllPostsByUser);
userPostsRouter.post("/", createUserPost);

module.exports = userPostsRouter;
