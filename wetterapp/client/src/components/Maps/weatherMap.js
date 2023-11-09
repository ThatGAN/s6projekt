import React from "react";
import { render } from "react-dom";
import L from "leaflet";
import PersistentDrawerLeft from "../Header/header";
import Checkbox from "@mui/material/Checkbox";

import "leaflet/dist/leaflet.css";
import "./Events.css";

class weatherMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clouds: false,
      mapState: true,
    };
  }

  componentDidMount() {
    this.map();
  }

  handleClouds = () => {
    this.setState((prevState) => ({
      clouds: !prevState.clouds,
    }));
    this.setState(
      {
        mapState: false,
      },
      () => {
        // this.map.map;
        // this.map();
      }
    );
  };

  map() {
    if (this.state.mapState === false) {
    }
    const selectedStation = this.state.selectedStation;
    const apiKey = "3b065e9f4a263796c86392703ecceefb";
    let map = L.map("map");
    map.setView([51.93, 7.6], 13);

    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    if (this.state.clouds === true) {
      L.tileLayer(
        `https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${apiKey}`
      ).addTo(map);
    }
  }

  render() {
    return (
      <>
        <PersistentDrawerLeft />
        <div className="checkbox">
          <Checkbox
            onChange={(e) => {
              this.handleClouds();
            }}
          />
          Wolken
        </div>
        <div id="map"></div>;
      </>
    );
  }
}

export default weatherMap;
