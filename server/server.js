require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const usersRouter = require("./routes/users.route");

const app = express();

// middleware
app.use(express.json());

// routes
app.use("/api/users", usersRouter);

// DB connection
mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    // server listening
    app.listen(process.env.PORT, () => {
      console.log(`Connected to DB. Listening on port ${process.env.PORT}...`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
