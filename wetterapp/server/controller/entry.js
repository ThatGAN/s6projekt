const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModal = require("../models/user.js");
const Station1 = require("../models/entry.js");

const all = async (req, res) => {
  try {
    console.log("test");
    const total = await Station1.countDocuments({});
    console.log("count: ", total);
    // const entries = await Station1.find();

    entry = Station1.find({}, (err, docs) => {
      if (err) {
        console.log("error");
        res.send({ msg: "no Config Item found(undefined)" });
      } else if (docs.length) {
        res.status(201).send(docs);
      } else {
        console.log("no Config Item found!");
        res.send({ msg: "no Config Item found" });
      }
    });

    // res.json({
    //   data: entries,
    // });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  all,
};
