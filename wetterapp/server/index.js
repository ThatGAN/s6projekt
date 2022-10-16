const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const connection = require("./db");
const userRouter = require("./routes/user.js");

require("dotenv").config();

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json());
app.use(cors());

connection();

//routes
app.use("/user", userRouter);

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Listening on port ${port}...`));
