const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FriendsSchema = new Schema({
  requester: { type: Schema.Types.ObjectId, ref: "User" },
  recipient: { type: Schema.Types.ObjectId, ref: "User" },
  status: {
    type: Number,
    enums: [
      0, //'add friend'
      1, //'requested,
      2, //'pending',
      3, //'friends'
    ],
  },
});

//@todo document transform remove _v, etc

module.exports = mongoose.model("Friends", FriendsSchema);
