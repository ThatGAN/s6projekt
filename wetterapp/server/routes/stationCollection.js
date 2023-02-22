const express = require("express");
const router = express.Router();

const {
  addNewStation,
  all,
  allById,
} = require("../controller/stationCollection.js");

router.post("/addNewStation", addNewStation);
router.post("/all", all);
router.post("/allById", allById);

module.exports = router;
