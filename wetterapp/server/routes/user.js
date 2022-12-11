const express = require("express");
const router = express.Router();

const { signin, signup, addExistingStation } = require("../controller/user.js");

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/addExistingStation", addExistingStation);
// router.post("/addNewStation", addNewStation);

module.exports = router;
