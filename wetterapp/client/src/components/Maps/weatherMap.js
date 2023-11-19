import React, { useEffect, useState } from "react";
import L from "leaflet";
import PersistentDrawerLeft from "../Header/header";
import Checkbox from "@mui/material/Checkbox";
import "leaflet/dist/leaflet.css";
import "./Events.css";

const WeatherMap = (props) => {
  const [clouds, setClouds] = useState(false);

  useEffect(() => {
    const apiKey = "3b065e9f4a263796c86392703ecceefb";
    const data = props.propToPass[1];
    console.log(data[0].lat);
    const map = L.map("map").setView([data[0].lat, data[0].lon], 13);

    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    if (clouds) {
      L.tileLayer(
        `https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${apiKey}`
      ).addTo(map);
    }
  }, [clouds]);

  const handleClouds = () => {
    setClouds((prevClouds) => !prevClouds);
  };

  return (
    <>
      <PersistentDrawerLeft />
      <div className="checkbox">
        <Checkbox onChange={handleClouds} />
        Wolken
      </div>
      <div id="map" style={{ height: "800px" }}></div>
    </>
  );
};

export default WeatherMap;
