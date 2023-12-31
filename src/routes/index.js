/* eslint-disable no-undef */
const express = require("express");
const router = express.Router();
const {
  create,
  update,
  findAll,
  findById,
  deleteById,
} = require("../dao/doctors");

router.get("/doctors", async (req, res) => {
  try {
    const doctors = await findAll(req, res);
    res.json(doctors);
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
});

router.post("/doctors", async (req, res) => {
  try {
    const doctor = create(req, res);
    res.json(doctor);
  } catch (err) {
    res.json({ message: err });
  }
});

// update doctor by id
router.put("/doctors/:id", async (req, res) => {
  try {
    const doctor = await update(req, res);
    res.json(doctor);
  } catch (err) {
    res.json({ message: err });
  }
});

// get doctor by id
router.get("/doctors/:id", async (req, res) => {
  try {
    const doctor = await findById(req, res);
    res.json(doctor);
  } catch (err) {
    res.json({ message: err });
  }
});

// delete doctor by id
router.delete("/doctors/:id", async (req, res) => {
  try {
    const doctor = await deleteById(req, res);
    res.json(doctor);
  } catch (err) {
    res.json({ message: err });
  }
});

// user signup route
const { signup, signin } = require("../dao/users");
router.post("/users/signup", async (req, res) => {
  try {
    const user = await signup(req, res);
    return user;
  } catch (err) {
    return err;
  }
});

router.post("/users/signin", async (req, res) => {
  try {
    const user = await signin(req, res);
    return user;
  } catch (err) {
    return err;
  }
});

// cbc routes
const {
  createCbc,
  updateCbc,
  findAllCbc,
  findByPatientIdCbc,
  deleteByIdCbc,
  findByDoctorIdPatientIdCbcId,
} = require("../dao/cbcs");

router.get("/cbcs", async (req, res) => {
  try {
    const cbcs = await findAllCbc(req, res);
    res.json(cbcs);
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
});

router.get("/cbcs/:id", async (req, res) => {
  try {
    const cbcs = await findByDoctorIdPatientIdCbcId(req, res);
    res.json(cbcs);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/cbcs", async (req, res) => {
  try {
    const cbc = await createCbc(req, res);
    res.json(cbc);
  } catch (err) {
    res.json({ message: err });
  }
});

// update cbc by id
router.put("/cbcs/:id", async (req, res) => {
  try {
    const cbc = await updateCbc(req, res);
    res.json(cbc);
  } catch (err) {
    res.json({ message: err });
  }
});

// get cbc by id and id is alphanumeric

router.get("/cbcs/:id", async (req, res) => {
  try {
    //validate request
    if (!req.params.id) {
      throw new Error({
        message: "Cbc id can not be empty!",
      });
    }
    const cbc = await findByPatientIdCbc(req, res);
    res.json(cbc);
  } catch (err) {
    res.json({ message: err });
  }
});

// delete cbc by id
router.delete("/cbcs/:id", async (req, res) => {
  try {
    const cbc = await deleteByIdCbc(req, res);
    res.json(cbc);
  } catch (err) {
    res.json({ message: err });
  }
});

// create routes for patients, users, and cbc
const {
  updatePatient,
  findAllPatients,
  findByIdPatient,
  deleteByIdPatient,
  createPatient,
} = require("../dao/patients");

router.get("/patients", async (req, res) => {
  try {
    const patients = await findAllPatients(req, res);
    res.json(patients);
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
});

router.post("/patients", async (req, res) => {
  try {
    const patient = await createPatient(req, res);
    res.json(patient);
  } catch (err) {
    res.json({ message: err });
  }
});

// update patient by id
router.put("/patients/:id", async (req, res) => {
  try {
    const patient = await updatePatient(req, res);
    res.json(patient);
  } catch (err) {
    res.json({ message: err });
  }
});

// get patient by id
router.get("/patients/:id", async (req, res) => {
  try {
    const patient = await findByIdPatient(req, res);
    res.json(patient);
  } catch (err) {
    res.json({ message: err });
  }
});

// delete patient by id
router.delete("/patients/:id", async (req, res) => {
  try {
    const patient = await deleteByIdPatient(req, res);
    res.json(patient);
  } catch (err) {
    res.json({ message: err });
  }
});

const { getUserList } = require("../dao/users");

router.get("/users", async (req, res) => {
  try {
    return await getUserList(req, res);
  } catch (err) {
    return await err;
  }
});

module.exports = router;
