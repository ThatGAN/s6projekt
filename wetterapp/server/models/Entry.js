const mongoose = require("mongoose");

const stationEntriesSchema = mongoose.Schema({
  id: { type: String },
  temp: { type: Number },
  humidity: { type: Number },
  lights: { type: Number },
  sound: { type: Number },
  pressure: { type: Number },
  createdAt: { type: String },
});

module.exports = mongoose.model(
  "stationEntries",
  stationEntriesSchema,
  "stationEntries"
);
