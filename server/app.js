const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const usersRouter = require("./routes/users.route");
const userPostsRouter = require("./routes/userPosts.route");
const friendsRouter = require("./routes/friends.route");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

logger.info("Connecting to", config.DB_URI);

// DB Connection
mongoose
  .connect(config.DB_URI)
  .then(() => {
    logger.info("Connected to DB.");
  })
  .catch((error) => {
    logger.error(error);
  });

// Middleware
app.use(cors());
//app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);

// Routes
app.use("/api/users", usersRouter);
app.use("/api/userPosts", userPostsRouter);
app.use("/api/friends", friendsRouter);

// Special Middleware - must come after Routes
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
