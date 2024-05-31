const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();

require("dotenv").config(); // Load environment variables

const PORT = process.env.PORT || 8060;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
  });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection success!");
});

app.listen(PORT, () => {
  console.log(`Server is up and running on port number ${PORT}`);
});

const studentRouter = require("./routes/students.js");

app.use("/student",studentRouter);