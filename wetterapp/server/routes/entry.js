const express = require("express");
const router = express.Router();

const { all, allById } = require("../controller/entry.js");

router.get("/all", all);
router.post("/allById", allById);

module.exports = router;
