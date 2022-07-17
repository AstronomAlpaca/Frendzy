const express = require("express");
const usersRouter = express.Router();
const {
  createUser,
  returnAllUsers,
  returnSingleUser,
  userLogin,
} = require("../controllers/users.controller");

usersRouter.get("/", returnAllUsers);
//@todo change to userId instead
usersRouter.get("/:userId", returnSingleUser);
usersRouter.post("/login", userLogin);
usersRouter.post("/register", createUser);

module.exports = usersRouter;
