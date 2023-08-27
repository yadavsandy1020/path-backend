/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// create user controller
const db = require("../../db");

const User = db.users;

// Create and Save a new User
exports.createUser = async (req, res) => {
  // Validate request
  if (!req.body.name) {
    throw new Error({
      message: "User name can not be empty!",
    });
  }

  // Create a User
  const user = new User({
    name: req.body.name,
    phone: req.body.phone,
    address: req.body.address,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  });

  // Save User in the database async
  try {
    const data = await user.save();
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// find and update user with the request body

exports.updateUser = async (req, res) => {
  // Validate Request
  if (!req.body) {
    throw new Error({
      message: "User content can not be empty",
    });
  }
  // get user by id and update it async await
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      },
      { new: true }
    );
    return user;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// delete user by id async await
exports.deleteByIdUser = async (req, res) => {
  try {
    const data = await User.findByIdAndDelete(req.params.id);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// get all users

exports.findAllUsers = async (req, res) => {
  try {
    const data = await User.find();
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// get user by id

exports.findByIdUser = async (req, res) => {
  try {
    const data = await User.findById(req.params.id);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
