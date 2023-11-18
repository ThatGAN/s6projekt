const stationEntries = require("../models/entry.js");

const moment = require("moment");

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
    const total = await stationEntries.countDocuments({});
    console.log("count: ", total);
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

const allByIdAndDate = async (req, res) => {
  try {
    stationId = req.body.stationId;
    var date = req.body.date;
    const total = await stationEntries.countDocuments({});
    console.log("count: ", total);

    var sDate = new Date(date[0].startDate);
    var eDate = new Date(date[0].endDate);
    var a = sDate.toISOString();
    var b = eDate.toISOString();

    entry = stationEntries.find(
      {
        station_id: { $in: stationId },
        createdAt: {
          $gte: a,
          $lte: b,
        },
      },
      (err, docs) => {
        if (err) {
          console.log("error");
          res.send({ msg: "no Config Item found(undefined)" });
        } else if (docs.length) {
          console.log("Sucess!");
          res.status(201).send(docs);
        } else {
          console.log("no Config Item found!");
          res.send({ msg: "no Config Item found." });
        }
      }
    );
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const lastEntryAndById = async (req, res) => {
  stationId = req.body.stationId;
  try {
    entry = stationEntries
      .find({ station_id: { $in: stationId } }, (err, docs) => {
        if (err) {
          console.log("error");
          res.send({ msg: "no Config Item found(undefined)" });
        } else if (docs.length) {
          console.log("Sucess!!!!");
          res.status(201).send(docs);
        } else {
          console.log("no Config Item found!!");
          res.send({ msg: "no Config Item found" });
        }
      })
      .sort({ _id: -1 })
      .limit(1);
  } catch (error) {
    docs.status(404).json({ message: error.message });
  }
};

module.exports = {
  all,
  allById,
  allByIdAndDate,
  lastEntryAndById,
};
