/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// create cbc controller to save cbc details
const db = require("../db");

//pagination import from util
const { paginateQuery } = require("./util");

// import mongoose
const mongoose = require("mongoose");

const Cbc = db.cbc;

// Create and Save a new Cbc
exports.createCbc = async (req, res) => {
  // Validate request
  if (!req.body.patient_id) {
    throw new Error({
      message: "Patient id can not be empty!",
    });
  }
  // Connect to MongoDB
  await mongoose.connect(db.url, { serverSelectionTimeoutMS: 30000 });

  // Create a Cbc
  const cbc = new Cbc({
    patient_id: req.body.patient_id,
    platelets: req.body.platelets,
    wbc: req.body.wbc,
    rbc: req.body.rbc,
    haemoglobin: req.body.haemoglobin,
    eosinophils: req.body.eosinophils,
    lymphocytes: req.body.lymphocytes,
    basophils: req.body.basophils,
    hct: req.body.hct,
    monocytes: req.body.monocytes,
    neutrophils: req.body.neutrophils,
    mcv: req.body.mcv,
    mch: req.body.mch,
    mchc: req.body.mchc,
    esr: req.body.esr,
    widal: req.body.widal,
    mp: req.body.mp,
  });
  if (req.body.doctor_id) {
    cbc.doctor_id = req.body.doctor_id;
  }
  // Save Cbc in the database async
  try {
    // connect to mongodb
    await mongoose.connect(db.url, { serverSelectionTimeoutMS: 30000 });
    const insertResult = await cbc.save();
    await mongoose.connection.close();
    return insertResult;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// find and update cbc with the request body
exports.updateCbc = async (req, res) => {
  // Validate Request
  if (!req.body) {
    throw new Error({
      message: "Cbc content can not be empty",
    });
  }
  // get cbc by id and update it async await
  try {
    // Connect to MongoDB
    await mongoose.connect(db.url, { serverSelectionTimeoutMS: 30000 });
    const cbc = await Cbc.findByIdAndUpdate(
      req.params.id,
      {
        patient_id: req.body.patient_id,
        doctor_id: req.body.doctor_id,
        platelets: req.body.platelets,
        wbc: req.body.wbc,
        rbc: req.body.rbc,
        haemoglobin: req.body.haemoglobin,
        eosnophils: req.body.eosnophils,
        lymphocytes: req.body.lymphocytes,
        monocytes: req.body.monocytes,
        neutrophils: req.body.neutrophils,
        mcv: req.body.mcv,
        mch: req.body.mch,
        mchc: req.body.mchc,
        hct: req.body.hct,
        esr: req.body.esr,
        widal: req.body.widal,
        mp: req.body.mp,
      },
      { new: true }
    );
    await mongoose.connection.close();
    return cbc;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// delete cbc by id async await
exports.deleteByIdCbc = async (req, res) => {
  // get cbc by id and delete it
  try {
    await mongoose.connect(db.url, { serverSelectionTimeoutMS: 30000 });
    const cbc = await Cbc.findByIdAndRemove(req.params.id);
    await mongoose.connection.close();
    return cbc;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// find all cbcs also add patient name async await also add pagination support

exports.findAllCbc = async (req, res) => {
  try {
    // Connect to MongoDB
    await mongoose.connect(db.url, { serverSelectionTimeoutMS: 30000 });
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const query = {
      // createdAt: {
      //   $gte: new Date(req.query.from) || new Date(),
      //   $lte: new Date(req.query.to) || new Date(),
      // },
    };
    const populate = ["patient_id", "doctor_id"];
    const cbcs = await paginateQuery(Cbc, query, page, limit, populate);
    await mongoose.connection.close();
    return cbcs;
  } catch (err) {
    console.log(err);
  }
};

// find cbc by id async await
exports.findByIdCbc = async (req, res) => {
  try {
    await mongoose.connect(db.url, { serverSelectionTimeoutMS: 30000 });
    const cbc = await Cbc.findById(req.params.id);
    await mongoose.connection.close();
    return cbc;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// find cbc by patient id or doctor id or cbc id and inculde patient and doctor collections data async await

exports.findByPatientIdCbc = async (req, res) => {
  try {
    await mongoose.connect(db.url, { serverSelectionTimeoutMS: 30000 });
    const cbc = await Cbc.find({ patient_id: req.params.id })
      .populate("doctor_id")
      .populate("patient_id");
    await mongoose.connection.close();
    return cbc;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// find cbc by patient id or doctor id or cbc id and inculde patient and doctor collections data async await
exports.findByDoctorIdPatientIdCbcId = async (req, res) => {
  try {
    // Connect to MongoDB
    await mongoose.connect(db.url, { serverSelectionTimeoutMS: 30000 });
    const query = {
      $or: [
        { _id: req.params.id },
        { doctor_id: req.params.id },
        { patient_id: req.params.id },
      ],
    };
    const populate = ["patient_id", "doctor_id"];
    const data = await paginateQuery(Cbc, query, req.params.page, 10, populate);
    await mongoose.connection.close();
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
