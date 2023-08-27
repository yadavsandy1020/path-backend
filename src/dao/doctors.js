/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// create doctor controller
const db = require("../db");

const Doctor = db.doctors;

// Create and Save a new Doctor
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.name) {
    throw new Error({
      message: "Doctor name can not be empty!",
    });
  }

  // Create a Doctor
  const doctor = new Doctor({
    name: req.body.name,
    phone: req.body.phone,
    address: req.body.address,
  });

  // Save Doctor in the database async
  try {
    const data = await doctor.save();
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// find and update doctor with the request body
exports.update = async (req, res) => {
  // Validate Request
  if (!req.body) {
    throw new Error({
      message: "Doctor content can not be empty",
    });
  }
  // get doctor by id and update it async await
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
      },
      { new: true }
    );
    return doctor;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// delete doctor by id async await
exports.deleteById = async (req, res) => {
  // get doctor by id and delete it
  try {
    const doctor = await Doctor.findByIdAndRemove(req.params.id);
    return doctor;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// find all doctor
exports.findAll = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    return doctors;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// find doctor by id
exports.findById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    return doctor;
  } catch (err) {
    console.log(err);
    return err;
  }
};
