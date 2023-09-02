/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// create user controller
const db = require("../db");
const mongoose = require("mongoose");

const User = db.users;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//user signup methods using jwt bcrypt and jsonwebtoken use encryption and decrption using async await handle all checks
exports.signup = async (req, res) => {
  // Validate request
  if (!req.body.name) {
    return res.status(400).json({
      error: "Name can not be empty!",
    });
  }
  if (!req.body.email) {
    return res.status(400).json({
      error: "Email can not be empty!",
    });
  }
  if (!req.body.password) {
    return res.status(400).json({
      error: "Password can not be empty!",
    });
  }
  if (!req.body.role) {
    return res.status(400).json({
      error: "Role can not be empty!",
    });
  }

  // connect to db
  await mongoose.connect(db.url, { serverSelectionTimeoutMS: 30000 });
  // check if user exists

  const userFound = await User.findOne({ email: req.body.email });
  if (userFound) {
    return res.status(400).json({
      error: "User already exists!",
    });
  }

  // Create a User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  // save user in the database use bcrpt to has pwd and useasync await and handle res statuses

  try {
    // gen salt
    const salt = await bcrypt.genSalt(10);
    // hash the password
    user.password = await bcrypt.hash(user.password, salt);
    // save user in the database
    // save user
    const data = await user.save();
    await mongoose.connection.close();
    return res.status(200).json({
      message: "User registered successfully!",
    });
  } catch (err) {
    return res.status(400).json({
      error: "Error creating user",
    });
  }
};

// sign in controller jwt generate and match hashed pwd
exports.signin = async (req, res) => {
  // Validate request
  if (!req.body.email) {
    return res.status(400).json({
      error: "Email can not be empty!",
    });
  }
  if (!req.body.password) {
    return res.status(400).json({
      error: "Password can not be empty!",
    });
  }

  // connect to db
  await mongoose.connect(db.url, { serverSelectionTimeoutMS: 30000 });

  // check if user exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({
      error: "User not found!",
    });
  }

  // check if password
  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) {
    return res.status(400).json({
      error: "Wrong password!",
    });
  }
  // generate jwt
  const token = jwt.sign(
    { id: user._id, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: 86400,
      algorithm: "HS256",
      subject: "user",
    }
  );
  await mongoose.connection.close();
  return res.status(200).json({
    data: {
      token: token,
    },
  });
};

// get user list controller
exports.getUserList = async (req, res) => {
  // connect to db
  await mongoose.connect(db.url, { serverSelectionTimeoutMS: 30000 });

  // get user list except password
  const users = await User.find({}, "-password");

  await mongoose.connection.close();

  return res.status(200).json({
    data: users,
  });
};
