import { Paper, Card } from "@mui/material";
import { OpenWeatherComponent } from "./openWeatherComponent.js";
import { LiveData } from "./liveData.js";
import { useState } from "react";

export const DataComponent = (props) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  return (
    <div className="test">
      {user?.result ? (
        <div className="app-container">
          <Card sx={{ borderRadius: "0%" }} className="liveData">
            <LiveData></LiveData>
          </Card>

          <Card sx={{ borderRadius: "0%" }} className="openWeather">
            <OpenWeatherComponent></OpenWeatherComponent>
          </Card>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
