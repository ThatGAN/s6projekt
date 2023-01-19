const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModal = require("../models/user.js");
const stationEntries = require("../models/entry.js");

const all = async (req, res) => {
  try {
    const total = await stationEntries.countDocuments({});
    console.log("count: ", total);
    // const entries = await stationEntries.find();

    const entry = await stationEntries.find({}, (err, docs) => {
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

const allById = async (req, res) => {
  try {
    stationId = req.body.stationId;
    // const entries = await stationEntries.find();
    // const total = await stationEntries.countDocuments({});
    // console.log("count: ", total);
    console.log("stat: ", stationId);

    entry = stationEntries.find(
      { station_id: { $in: stationId } },
      (err, docs) => {
        if (err) {
          console.log("error");
          res.send({ msg: "no Config Item found(undefined)" });
        } else if (docs.length) {
          res.status(201).send(docs);
        } else {
          console.log("no Config Item found!");
          res.send({ msg: "no Config Item found" });
        }
      }
    );

    // res.json({
    //   data: entries,
    // });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  all,
  allById,
};
