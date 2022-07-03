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

const returnAllUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

module.exports = {
  createUser,
  returnAllUsers,
};
