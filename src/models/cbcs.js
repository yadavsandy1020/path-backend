/* eslint-disable no-undef */
// create model for patients complete blood count details and add foreign key patient_id to patients table and doctor_id to doctors table    patient_id: platelets wbc,rbc, haemoglobin mcv mchc
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cbcSchema = new Schema(
  {
    patient_id: {
      type: Schema.Types.ObjectId,
      ref: "patients",
    },
    doctor_id: {
      type: Schema.Types.ObjectId,
      ref: "doctors",
    },

    platelets: {
      type: Number,
      required: false,
    },
    wbc: {
      type: Number,
      required: false,
    },
    rbc: {
      type: Number,
      required: false,
    },
    haemoglobin: {
      type: Number,
      required: false,
    },
    mcv: {
      type: Number,
      required: false,
    },
    mch: {
      type: Number,
      required: false,
    },
    mchc: {
      type: Number,
      required: false,
    },
    lymphocytes: {
      type: Number,
      required: false,
    },
    monocytes: {
      type: Number,
      required: false,
    },
    eosinophils: {
      type: Number,
      required: false,
    },
    basophils: {
      type: Number,
      required: false,
    },
    neutrophils: {
      type: Number,
      required: false,
    },
    hct: {
      type: Number,
      required: false,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("cbcs", cbcSchema);
