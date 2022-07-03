const User = require("../models/user.model");

const confirmWorking = async (req, res) => {
  await res.send("working!");
};

module.exports = {
  confirmWorking,
};
