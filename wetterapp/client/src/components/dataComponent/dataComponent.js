import { Paper, Card } from "@mui/material";
import { OpenWeatherComponent } from "./openWeatherComponent.js";
import { LiveData } from "./liveData.js";
import { Grid } from "@mui/material";
import { useState } from "react";

export const DataComponent = (props) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  return (
    <div>
      {user?.result ? (
        <Grid container spacing={0}>
          <Grid item sx={6}>
            <Card sx={{ borderRadius: "0%" }} className="liveData">
              <LiveData dataFromParent={props.dataFromParent}></LiveData>
            </Card>
          </Grid>
          <Grid item sx={6}>
            <Card sx={{ borderRadius: "0%" }} className="openWeather">
              <OpenWeatherComponent></OpenWeatherComponent>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <div></div>
      )}
    </div>
  );
};
