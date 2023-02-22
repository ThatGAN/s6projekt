const express = require("express");
const router = express.Router();

const { openWeatherData } = require("../controller/openWeatherData.js");

router.post("/openWeatherData", openWeatherData);

module.exports = router;
