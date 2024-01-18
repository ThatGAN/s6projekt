import React from "react";
import PersistentDrawerLeft from "../Header/header";
import "./Events.css";
import {
  Map,
  TileLayer,
  Marker,
  Popup,
  Circle,
  FeatureGroup,
  Rectangle,
  Tooltip,
} from "react-leaflet";
import LayersControl2, { ControlledLayerItem } from "./LayerControl2";
import marker from "../../assets/map-marker-svgrepo-com.svg";
import { Icon } from "leaflet";
const myIcon = new Icon({
  iconUrl: marker,
  iconSize: [32, 32],
});

class weatherMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    try {
      var position = {
        lat: this.props.propToPass[1][0].lat,
        lon: this.props.propToPass[1][0].lon,
      };
      var data = this.props.propToPass[0][0] ?? [];
      console.log("Data:", data);
    } catch (error) {
      data = "";
      console.log("No data");
    }
    const apiKey = "3b065e9f4a263796c86392703ecceefb";
    return (
      <>
        <PersistentDrawerLeft />
        <Map style={{ height: "100vh" }} center={position} zoom={15}>
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
              name="Temperatur"
              group="BaseLayers"
            >
              <TileLayer url="https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=3b065e9f4a263796c86392703ecceefb" />
            </ControlledLayerItem>
            <ControlledLayerItem
              checked={false}
              name="Clouds"
              group="BaseLayers"
            >
              <TileLayer url="https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=3b065e9f4a263796c86392703ecceefb" />
            </ControlledLayerItem>
            <ControlledLayerItem
              checked={false}
              name="Niederschlag"
              group="BaseLayers"
            >
              <TileLayer url="https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=3b065e9f4a263796c86392703ecceefb" />
            </ControlledLayerItem>
            <ControlledLayerItem
              checked={false}
              name="Luftdruck"
              group="BaseLayers"
            >
              <TileLayer url="https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=3b065e9f4a263796c86392703ecceefb" />
            </ControlledLayerItem>
            <ControlledLayerItem checked={false} name="Wind" group="BaseLayers">
              <TileLayer url="https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=3b065e9f4a263796c86392703ecceefb" />
            </ControlledLayerItem>
          </LayersControl2>
          <Marker position={position} icon={myIcon}>
            <Tooltip permanent direction="top" offset={[0, -20]}>
              <h3>{this.props.propToPass[2]}</h3>
              <div>
                Temperatur:
                {!data.length ? data.temperature : data.length}
              </div>
              <div>Luftfeuchtigkeit: {data.humidity}</div>
              <div>Luftdruck: {data.pressure}</div>
              <div>Lichtlevel: {data.illuminance}</div>
              <div>
                {data.sound ? ["Lautstärke: ", data.sound] : data.sound}
              </div>
              <div>
                {data.groundHumidity
                  ? ["Bodenfeuchtigkeit: ", data.groundHumidity]
                  : data.groundHumidity}
              </div>
            </Tooltip>
          </Marker>
        </Map>
      </>
    );
  }
}

export default weatherMap;
