import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

export const OpenWeatherComponent = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  useEffect(() => {
    const setInitLocation = async () => {
      setLocation("brochterbeck");
      await axios
        .get(url)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
          console.log(url);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    setInitLocation();
  }, []);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=brochterbeck&units=metric&lang=de&appid=3b065e9f4a263796c86392703ecceefb`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  console.log("l", location);
  return (
    <div className="app">
      {/* <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div> */}
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°C</p>
              ) : null}
              <p>Gefühlt</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Luftfeutchtigkeit</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} KM/H</p>
              ) : null}
              <p>Wind Geschwindigkeit</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
