require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const usersRouter = require("./routes/users.route");

const app = express();

// middleware
app.use(express.json());

// routes
app.use("/api/users", usersRouter);

// special middleware for catching non-existent routes.
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

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
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
