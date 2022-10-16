const mongoose = require("mongoose");

module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    mongoose.connect(process.env.DB, connectionParams);
    console.log("Mit Datenbank verbunden");
  } catch (error) {
    console.log(error);
    console.log("Konnte nicht mit Datenbank verbunden werden");
  }
};
