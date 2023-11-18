import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import "./dataComponent.css";
import { fetchSingleEntry } from "../Slices/entrySlice.js";

export const LiveData = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState();
  const [formattedDate, setFormattedDate] = useState();
  let selectedStation = useSelector((state) => state.station.selectedStation);
  const name = useSelector((state) => state.station.selectedStation.name);
  useEffect(() => {
    dispatch(fetchSingleEntry(selectedStation._id)).then((res) => {
      console.log(res.payload);
      const data = res.payload[0];
      setState(data);
      loadData(res.payload);
    });
  }, []);
  const data = state;

  const loadData = (data) => {
    if (data.createdAt) {
      var tempCreatedAt = new Date(data.createdAt);
    } else {
      var tempCreatedAt = new Date();
    }

    var timezoneOffset = new Date().getTimezoneOffset();

    // Adjust the hours to the local timezone, accounting for DST changes
    // tempCreatedAt.setHours(tempCreatedAt.getHours() + timezoneOffset / 60);
    var localMonth = tempCreatedAt.getUTCMonth() + 1;

    // Format the date string with padded minutes
    var formattedCreatedAt =
      tempCreatedAt.getDate().toString().padStart(2, "0") +
      "." +
      localMonth.toString().padStart(2, "0") +
      " " +
      tempCreatedAt.getHours().toString().padStart(2, "0") +
      ":" +
      tempCreatedAt.getMinutes().toString().padStart(2, "0");

    setFormattedDate(formattedCreatedAt);
  };

  const formattedCreatedAt = formattedDate;
  console.log(formattedCreatedAt);

  const getComponent = () => {
    if (!state) {
      return <div></div>;
    } else {
      return (
        <div className="app">
          <div className="top">
            <div className="location">
              <p>{name}</p>
            </div>
            <div className="temp">
              <h1>{data.temperature}°C</h1>
            </div>{" "}
            <div className="time">
              <p>{formattedCreatedAt} Uhr</p>{" "}
            </div>{" "}
          </div>{" "}
          <div className="bottom">
            {" "}
            <div className="Data">
              <p className="writing">Luftfeutchtigkeit:</p>
              <p className="bold">{data.humidity}%</p>
              <p className="writing">Lufdruck:</p>
              <p className="bold">{data.pressure} hPa</p>
              <p className="writing">Helligkeit</p>
              <p className="bold">{data.illuminance}</p>{" "}
            </div>{" "}
            <div className="wind">
              {" "}
              {/* {data.wind ? (
      //         <p className="bold">{data.wind.speed.toFixed()} KM/H</p>
      //       ) : null}
      //       <p className="writing">Wind Geschwindigkeit</p> */}{" "}
            </div>{" "}
          </div>{" "}
        </div>
      );
    }
  };

  return getComponent();
};
