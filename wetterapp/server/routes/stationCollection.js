const express = require("express");
const router = express.Router();

const { addNewStation, all } = require("../controller/stationCollection.js");

router.post("/addNewStation", addNewStation);
router.post("/all", all);

module.exports = router;
