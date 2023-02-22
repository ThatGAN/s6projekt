const openWeatherData = async (req, res) => {
  location = req.body;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&lang=de&appid=3b065e9f4a263796c86392703ecceefb`;
  try {
    await axios.get(url).then((err, docs) => {
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
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  openWeatherData,
};
