// create api code to get users list using express js
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const router = require("./routes/index");

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
app.use("/api", router);

// connect to mongodb  database
const db = require("./db");
db.mongoose
  .connect(db.url, {})
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// set port, listen for requests
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
