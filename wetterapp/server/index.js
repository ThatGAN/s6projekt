const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const connection = require("./db");
const userRouter = require("./routes/user.js");
const entryRouter = require("./routes/entry.js");
const stationCollectionRouter = require("./routes/stationCollection.js");

require("dotenv").config();

const app = express();
// const corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json());
app.use(cors());

connection();

//routes
app.use("/user", userRouter);
app.use("/entry", entryRouter);
app.use("/stationCollection", stationCollectionRouter);

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Listening on port ${port}...`));
