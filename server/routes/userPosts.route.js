const express = require("express");
const userPostsRouter = express.Router();
const { createUserPost } = require("../controllers/userPosts.controller");

userPostsRouter.post("/", createUserPost);

module.exports = userPostsRouter;
