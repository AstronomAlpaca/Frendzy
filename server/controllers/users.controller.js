const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const createUser = async (req, res) => {
  const { first_name, surname, username, email, password } = req.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({
      error: "username must be unique",
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = new User({
    first_name: first_name,
    surname: surname,
    username: username,
    email: email,
    password: passwordHash,
  });

  const savedUser = await user.save();

  res.status(201).json(savedUser);
};

const userLogin = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.password);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: "failed login attempt. check username and password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60, // Problems of Token-based auth
  });

  res.status(200).send({
    token,
    username: user.username,
    first_name: user.first_name,
    surname: user.surname,
  });
};

const returnAllUsers = async (req, res) => {
  const users = await User.find({}).populate("userPosts", {
    content: 1,
    date: 1,
  });

  res.json(users);
};

module.exports = {
  createUser,
  returnAllUsers,
  userLogin,
};
