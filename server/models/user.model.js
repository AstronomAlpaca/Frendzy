const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    first_name: { type: String, required: true },
    surname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, required: true },
    userPosts: [
      {
        type: Schema.Types.ObjectId,
        ref: "UserPost",
      },
    ],
  },
  { timestamps: true }
);

UserSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.password;
  },
});

module.exports = mongoose.model("User", UserSchema);
