const express = require("express");
const router = express.Router();

const { getData } = require("../controller/openWeather.js");

router.post("/getData", getData);

module.exports = router;
