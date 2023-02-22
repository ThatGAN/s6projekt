const stationCollection = require("../models/stationCollection.js");

const all = async (req, res) => {
  try {
    const total = await stationCollection.countDocuments({});
    console.log("count: ", total);
    // const entries = await stationCollection.find();

    entry = stationCollection.find({}, (err, docs) => {
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

    station = stationCollection.find(
      { _id: { $in: stationId } },
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
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const addNewStation = async (req, res) => {
  const { name, location } = req.body;

  try {
    const result = await stationCollection.create({
      name,
      location,
    });
    res.status(201).json({ result });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};

module.exports = {
  all,
  allById,
  addNewStation,
};
