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

UserPostSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("UserPost", UserPostSchema);
