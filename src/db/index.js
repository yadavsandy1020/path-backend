/* eslint-disable no-undef */
// create mongoose configuration

const mongoose = require("mongoose");
const env = require("dotenv");
env.config();
const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB_URI;
db.patients = require("../models/patients");
db.doctors = require("../models/doctors");
db.users = require("../models/users");
db.cbc = require("../models/cbcs");

module.exports = db;
