const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserPostSchema = new Schema({
  content: { type: String, required: true },
  date: { type: Date },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("UserPost", UserPostSchema);
