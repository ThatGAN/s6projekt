import { Paper, Card } from "@mui/material";
import { OpenWeatherComponent } from "./openWeatherComponent.js";
import { LiveData } from "./liveData.js";
import { Grid } from "@mui/material";
import { useState } from "react";

export const DataComponent = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  return (
    <div>
      {user?.result ? (
        <Paper elevation={12}>
          <Grid container spacing={3}>
            <Grid item sx={6}>
              <Card className="openWeather">
                <OpenWeatherComponent></OpenWeatherComponent>
              </Card>
            </Grid>
            <Grid item sx={6}>
              <Card className="liveData">
                <LiveData></LiveData>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      ) : (
        <div></div>
      )}
    </div>
  );
};
