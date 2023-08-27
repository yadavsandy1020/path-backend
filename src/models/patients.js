/* eslint-disable no-undef */
// create model for patients details with name, phone, address and doctor_id
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    sex: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("patients", patientSchema);
