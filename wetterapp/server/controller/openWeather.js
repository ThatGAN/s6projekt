const axios = require("axios");

location = "";

const getData = async (req, res) => {
  const location = req.body.location;
  const url = process.env.URL;
  const url2 = url.replace("${location}", location);
  console.log("URL:", url2);
  try {
    await axios.get(url2).then((response) => {
      console.log(response.data);
      res.status(201).send(response.data);
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getData,
};
