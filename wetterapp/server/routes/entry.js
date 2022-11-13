const express = require("express");
const router = express.Router();

const { all } = require("../controller/entry.js");

router.get("/all", all);

module.exports = router;
