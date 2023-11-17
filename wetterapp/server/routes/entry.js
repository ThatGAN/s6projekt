const express = require("express");
const router = express.Router();

const {
  all,
  allById,
  allByIdAndDate,
  lastEntryAndById,
} = require("../controller/entry.js");

router.get("/all", all);
router.post("/allById", allById);
router.post("/allByIdAndDate", allByIdAndDate);
router.post("/lastEntryAndById", lastEntryAndById);

module.exports = router;
