/* eslint-disable no-undef */
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
    mp: {
      type: String,
      required: false,
    },
    esr: {
      type: Number,
      required: false,
    },
    widal: {
      styphiO: {
        type: Number,
        required: true,
      },
      styphiH: {
        type: Number,
        required: true,
      },
      sParaTyphiAH: {
        type: Number,
        required: true,
      },
      sParaTyphiBH: {
        type: Number,
        required: true,
      },
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("cbcs", cbcSchema);
