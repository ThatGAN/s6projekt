import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-openweathermap";

function Map() {
  React.useEffect(() => {
    const map = L.map("map").setView([51.505, -0.09], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      map
    );

    const owm = L.OWM({
      appId: "your-app-id",
      // other options...
    }).addTo(map);

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div id="map" style={{ height: "400px" }}>
      {/* The map will be rendered here */}
    </div>
  );
}
export default Map;
