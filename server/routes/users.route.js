const express = require("express");
const usersRouter = express.Router();
const { confirmWorking } = require("../controllers/users.controller");

usersRouter.get("/", confirmWorking);

module.exports = usersRouter;
