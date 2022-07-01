require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

// middleware - todo

// routes - todo

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
