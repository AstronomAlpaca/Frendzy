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
    console.log("Connected to DB.");
  })
  .catch((error) => {
    console.log(error);
  });

// server listening
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}...`);
});
