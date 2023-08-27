// create api code to get users list using express js
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const router = require("./routes/");

const env = require("dotenv");
env.config();

app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

const port = process.env.PORT || 3000; // get port from environment variable or default to 3000
// allow cors using cors middleware
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json()); // parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: true })); // parse requests of content-type - application/x-www-form-urlencoded
// app.use("/api", router);
app.use(`/.netlify/functions/api`, router);

module.exports = app;
