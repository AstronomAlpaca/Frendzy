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

module.exports = mongoose.model("Friends", FriendsSchema);

// make new view for userB to see new notifications of friend requests
// get all records from db of friends table (depending on userID, route to view, friends controller)
// return all records matching this user ID
// @todo
