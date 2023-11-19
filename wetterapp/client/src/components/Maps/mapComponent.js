import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import WeatherMap from "./weatherMap";
import { fetchSingleEntry } from "../Slices/entrySlice.js";

export const MapComponent = () => {
  const dispatch = useDispatch();
  const [dataToPass, setDataToPass] = useState();
  const [propToPass, setPropToPass] = useState([]);

  const selectedStation = useSelector((state) => state.station.selectedStation);

  useEffect(() => {
    dispatch(fetchSingleEntry(selectedStation._id)).then((res) => {
      console.log(res.payload);
      if (res.payload > 0) {
        console.log("Now");
      }
      switch (selectedStation.name) {
        case "UNO R-3":
          setPropToPass([res.payload, [{ lat: 51.93, lon: 7.6 }]]);
          break;
        case "MKR NB 1500":
          setPropToPass([res.payload, [{ lat: 52.23, lon: 7.75 }]]);
          break;
        default:
          console.log("Error");
      }
    });
  }, [selectedStation._id]);

  useEffect(() => {}, [selectedStation.name, dataToPass]);

  console.log("Here:", propToPass);

  return <WeatherMap propToPass={propToPass} />;
};
