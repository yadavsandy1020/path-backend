/* eslint-disable no-undef */
// create role controller
const mongoose = require("mongoose");
const db = require("../db");
const Role = db.role;

// create role controller use asynch await with all condition check
exports.createRole = async (req, res) => {
  // Validate request
  if (!req.body.name) {
    return res.status(400).json({
      error: "Role name can not be empty!",
    });
  }
  // connect to db
  await mongoose.connect(db.url, { serverSelectionTimeoutMS: 30000 });

  // Create a Role
  const role = new Role({
    name: req.body.name,
  });

  // Save Role in the database
  try {
    const savedRole = await role.save();
    return res.status(200).json({
      status: "success",
      data: savedRole,
    });
  } catch (err) {
    return res.status(400).json({
      error: "Error creating role",
    });
  } finally {
    await mongoose.connection.close();
  }
};

// get role list controller use asynch await instead of then// callback function
exports.getRoleList = async (req, res) => {
  try {
    // connect with db
    await mongoose.connect(db.url, { serverSelectionTimeoutMS: 30000 });
    const roles = await Role.find();
    return res.status(200).json({
      status: "success",
      data: roles,
    });
  } catch (err) {
    return res.status(400).json({
      error: "Error fetching roles",
    });
  } finally {
    await mongoose.connection.close();
  }
};
