// create patient controller

const db = require("../../db");
const { paginateQuery } = require("./util");

const Patient = db.patients;

// Create and Save a new Patient
exports.createPatient = async (req, res) => {
  // Validate request
  if (!req.body.name) {
    throw new Error({
      message: "Patient name can not be empty!",
    });
  }

  // Create a Patient
  const patient = new Patient({
    name: req.body.name,
    age: req.body.age,
    sex: req.body.sex,
    phone: req.body.phone,
    address: req.body.address,
  });

  // Save Patient in the database async
  try {
    const insertResult = await patient.save();
    console.log(insertResult);
    return insertResult;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// delete patient by id async await
exports.deleteByIdPatient = async (req, res) => {
  try {
    const data = await Patient.findByIdAndDelete(req.params.id);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// find and update patient with the request body
exports.updatePatient = async (req, res) => {
  // Validate Request
  if (!req.body) {
    throw new Error({
      message: "Patient content can not be empty",
    });
  }
  // get patient by id and update it async await
  try {
    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        age: req.body.age,
        sex: req.body.sex,
        phone: req.body.phone,
        address: req.body.address,
      },
      { new: true }
    );
    return patient;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// Retrieve all Patients from the database async await
exports.findAllPatients = async (req, res) => {
  try {
    const query = {};
    const data = await paginateQuery(Patient, query, req.params.page, 10, []);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// Find a single Patient with an id
exports.findByIdPatient = async (req, res) => {
  try {
    const data = await Patient.findById(req.params.id);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
