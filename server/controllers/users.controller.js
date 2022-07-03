const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const createUser = async (req, res) => {
  const { first_name, surname, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      error: "email must be unique",
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = new User({
    first_name: first_name,
    surname: surname,
    email: email,
    password: passwordHash,
  });

  const savedUser = await user.save();

  res.status(201).json(savedUser);
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: "failed login attempt. check email and password",
    });
  }

  const userForToken = {
    email: user.email,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  res.status(200).send({
    token,
    email: user.email,
    first_name: user.first_name,
    surname: user.surname,
  });
};

const returnAllUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

module.exports = {
  createUser,
  returnAllUsers,
  userLogin,
};
