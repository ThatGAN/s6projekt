const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModal = require("../models/user.js");
const stationCollection = require("../models/stationCollection.js");

const secret = "test";

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    console.log("pw here: ", oldUser.password);

    const isPasswordCorrect = bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1h",
    });

    const retUser = {
      name: oldUser.name,
      email: oldUser.email,
      stationIds: oldUser.stationIds,
    };

    console.log("NEW USER: ", retUser);

    res.status(200).json({ result: retUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      stationIds: [],
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};

const addExistingStation = async (req, res) => {
  // const token = req.headers.authorization.split(" ")[1];

  /* 
    2. Prüfen ob Station Id Valid ist, dazu einfach Station.find > 0 methode verwenden
    2.1 Crash bei nicht Id länge verhindern
    */

  console.log("test!", req.body);
  const token = req.body.token;

  decodedData = jwt.verify(token, secret);

  const userId = decodedData.id;
  const stationId = req.body.stationId;

  console.log("stationId: ", stationId);

  try {
    const result = await stationCollection.findOne({ _id: stationId }).lean();
    if (result) {
      // const resultStations = await stationCollection
      //   .findOne({ _id: stationID })
      //   .lean();
      // if (!resultStations) {
      const filter = { _id: userId };

      let userBefore = await UserModal.find(filter);

      const oldStationIds = userBefore[0].stationIds;

      const update = { stationIds: [...oldStationIds, stationId] };

      console.log("already set stations: ", userBefore[0].stationIds);

      let doc = await UserModal.findOneAndUpdate(filter, update);

      doc = await UserModal.findOne(filter);
      console.log("updated: ", doc.stationIds);

      console.log("dec: ", decodedData);
      return res.status(201);
      // } else {
      //   console.log("This station is already added to this account.");
      //   return res
      //     .status(400)
      //     .json({ message: "This station is already added to this account." });
    } else {
      console.log("No existing station with this ID");
      return res
        .status(400)
        .json({ message: "No station with this ID exists" });
    }
  } catch (error) {
    return res.status(400).json({ message: "No station with this ID exists" });
  }
};

module.exports = {
  signin,
  signup,
  addExistingStation,
};
