const User = require("../models/user.model");

const confirmWorking = (req, res) => {
  res.send("working!");
};

module.exports = {
  confirmWorking,
};
