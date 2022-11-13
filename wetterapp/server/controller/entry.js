const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModal = require("../models/user.js");
const Station1 = require("../models/entry.js");

const all = async (req, res) => {
  try {
    const total = await Station1.countDocuments({});
    console.log("count: ", total);
    const entries = await Station1.find();

    res.json({
      data: entries,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  all,
};
