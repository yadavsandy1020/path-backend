/* eslint-disable no-undef */
// create model for user roles with permissions of frontend pages like patients, doctors, users etc
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserRoleSchema = new Schema({
  role: {
    type: String,
    required: true,
  },

  permissions: {
    type: JSON,
    required: true,
  },
});

module.exports = mongoose.model("userroles", UserRoleSchema);
