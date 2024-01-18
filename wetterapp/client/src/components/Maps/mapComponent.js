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
          setPropToPass([
            res.payload,
            [{ lat: 51.9390063, lon: 7.6097795 }],
            selectedStation.name,
          ]);
          break;
        case "MKR NB 1500":
          setPropToPass([
            res.payload,
            [{ lat: 52.230529620106836, lon: 7.753416270493587 }],
            selectedStation.name,
          ]);
          break;
        default:
          console.log("Error");
      }
    });
  }, [selectedStation._id]);

  console.log("Here:", propToPass);

  return <WeatherMap propToPass={propToPass} />;
};
