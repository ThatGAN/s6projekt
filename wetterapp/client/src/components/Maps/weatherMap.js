import React from "react";
import { render } from "react-dom";
import PersistentDrawerLeft from "../Header/header";
import Checkbox from "@mui/material/Checkbox";
import {
  Map,
  TileLayer,
  Marker,
  Popup,
  Circle,
  FeatureGroup,
  Rectangle
} from "react-leaflet";
import LayersControl2, { ControlledLayerItem } from "./LayerControl2";
import Paper from "@material-ui/core/Paper";

import "leaflet/dist/leaflet.css";
import "./Events.css";

const center = [51.505, -0.09];
const rectangle = [[51.49, -0.08], [51.5, -0.06]];

class weatherMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  
  render() {
    const position = [51.509, -0.03];
    const apiKey = "3b065e9f4a263796c86392703ecceefb";
    return (
      <>
        <PersistentDrawerLeft />
        <Map style={{ height: "100vh" }} center={position} zoom={13}>
        <LayersControl2 position="topright">
          <ControlledLayerItem
            checked={true}
            name="OpenStreetMap"
            group="BaseLayers"
          >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            </ControlledLayerItem>
            <ControlledLayerItem
            checked={false}
            name="Clouds"
            group="BaseLayers"
          >
            <TileLayer
             url="https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=3b065e9f4a263796c86392703ecceefb"
            />
          </ControlledLayerItem>
          <ControlledLayerItem
            checked={false}
            name="Rectangle"
            group="Rectangles"
          >
            <Rectangle bounds={rectangle} />
          </ControlledLayerItem>

          <ControlledLayerItem checked={false} name="2 circles" group="Circles">
            <FeatureGroup color="purple">
              <Circle center={[51.51, -0.06]} radius={200} />
              <Circle center={[51.58, -0.06]} radius={200} />
            </FeatureGroup>
          </ControlledLayerItem>
          <ControlledLayerItem checked={false} name="1 circle" group="Circles">
            <FeatureGroup color="blue">
              <Circle center={[51.51, -0.06]} radius={200} />
            </FeatureGroup>
          </ControlledLayerItem>
        </LayersControl2>
      </Map>
      </>
    );
  }
}

export default weatherMap;
