const express = require("express");
const usersRouter = express.Router();
const {
  createUser,
  returnAllUsers,
  userLogin,
} = require("../controllers/users.controller");

usersRouter.get("/", returnAllUsers);
usersRouter.post("/login", userLogin);
usersRouter.post("/register", createUser);

module.exports = usersRouter;
