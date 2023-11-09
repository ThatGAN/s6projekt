import { useSelector, useDispatch } from "react-redux";
import WeatherMap from "./weatherMap";

export const MapComponent = () => {
  const data = useSelector((state) => state.station.selectedStation);

  return <WeatherMap></WeatherMap>;
};
