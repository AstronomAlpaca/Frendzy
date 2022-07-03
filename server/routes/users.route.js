const express = require("express");
const usersRouter = express.Router();
const {
  createUser,
  returnAllUsers,
} = require("../controllers/users.controller");

usersRouter.get("/", returnAllUsers);
usersRouter.post("/register", createUser);

module.exports = usersRouter;
