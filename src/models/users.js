/* eslint-disable no-undef */
// create user model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    phone: String,
    address: String,
    role: String,
    status: String,
    created_at: Date,
    updated_at: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
