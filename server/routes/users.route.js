const express = require("express");
const usersRouter = express.Router();
const {
  createUser,
  returnAllUsers,
  returnSingleUser,
  userLogin,
} = require("../controllers/users.controller");

usersRouter.get("/", returnAllUsers);
usersRouter.get("/:userName", returnSingleUser);
usersRouter.post("/login", userLogin);
usersRouter.post("/register", createUser);

module.exports = usersRouter;
