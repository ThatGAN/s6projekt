import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Button } from "@mui/material";
import "./dataComponent.css";
import { fetchOpenWeather } from "../Slices/openWeather";

export const OpenWeatherComponent = () => {
  const [data, setData] = useState([
    {
      name: "",
    },
  ]);

  const dispatch = useDispatch();
  const location = useSelector(
    (state) => state.station.selectedStation.location
  );
  console.log("Location:", location);

  useEffect(() => {
    setInitLocation();
  }, [location]);

  const setInitLocation = () => {
    dispatch(fetchOpenWeather(location)).then((res) => {
      console.log("openWeatherPayload: ", res.payload);
      setData(res.payload);
    });
  };

  return (
    <div className="app">
      <div className="top">
        <div className="location">
          <p>{data.name}</p>
        </div>
        <div className="temp">
          {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
        </div>
        <div className="description">
          {data.weather ? <p>{data.weather[0].description}</p> : null}
        </div>
      </div>

      {data.name !== undefined && (
        <div className="bottom">
          <div className="Data">
            <p className="writing">Luftfeutchtigkeit:</p>
            {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
            <p className="writing">Lufdruck:</p>
            {data.main ? (
              <p className="bold">{data.main.pressure} hPa</p>
            ) : null}
            <p className="writing">Wind Geschwindigkeit:</p>
            {data.wind ? (
              <p className="bold">{data.wind.speed.toFixed()} KM/H</p>
            ) : null}
          </div>
          <div>{data.weather.icon}</div>
          <div className="wind">
            {/* {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} KM/H</p>
              ) : null}
              <p className="writing">Wind Geschwindigkeit</p> */}
          </div>
        </div>
      )}
    </div>
  );
};
