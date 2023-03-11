import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button } from "@mui/material";
import "./dataComponent.css";

export const OpenWeatherComponent = () => {
  const [data, setData] = useState({});

  const location = "";

  useEffect(() => {
    // setInitLocation();
  }, []);

  // // const selectedStation = localStorage.getItem("selectedStation");
  // let selectedStation = useSelector((state) => state.singleStation.value);
  // location = selectedStation.location;

  // const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&lang=de&appid=3b065e9f4a263796c86392703ecceefb`;

  // console.log("location", selectedStation.location);
  // console.log("URL:", url);
  // const setInitLocation = () => {
  //   axios
  //     .get(url)
  //     .then((response) => {
  //       setData(response.data);
  //       console.log(response.data);
  //       console.log(url);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

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
      {/* <Button onClick={setInitLocation}>Reload Here</Button> */}
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
              <p className="writing">Gefühlt</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p className="writing">Luftfeutchtigkeit</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} KM/H</p>
              ) : null}
              <p className="writing">Wind Geschwindigkeit</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
