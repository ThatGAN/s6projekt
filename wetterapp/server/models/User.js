const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
  stationIds: { type: [String] },
});

module.exports = mongoose.model("User", userSchema);
