const express = require("express");
const userPostsRouter = express.Router();
const {
  createUserPost,
  returnAllUserPosts,
  //returnAllPostsByUser,
} = require("../controllers/userPosts.controller");

userPostsRouter.get("/", returnAllUserPosts);
userPostsRouter.post("/", createUserPost);
// userPostsRouter.get("/:userId", returnAllPostsByUser);

module.exports = userPostsRouter;
