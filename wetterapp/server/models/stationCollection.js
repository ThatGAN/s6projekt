const mongoose = require("mongoose");

const stationCollectionSchema = mongoose.Schema({
  id: { type: String },
  name: { type: String },
  location: { type: String },
});

module.exports = mongoose.model("Stations", stationCollectionSchema);
