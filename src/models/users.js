/* eslint-disable no-undef */
// create user model with auth fields
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // role from roles table
  role_id: {
    type: Schema.Types.ObjectId,
    ref: "roles",
  },
});

// export user model
module.exports = mongoose.model("users", UserSchema);
