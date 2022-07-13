const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserPostSchema = new Schema({
  content: { type: String, required: true },
  date: { type: Date },
  user: {
    // Not sure if this is safe to be a string or if it
    // strictly needs to be ObjectID. However it's fixing a Front-End error
    type: Schema.Types.String,
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
