import { Paper, Card } from "@mui/material";
import { OpenWeatherComponent } from "./openWeatherComponent.js";
import { liveData } from "./liveData.js";
import { Grid } from "@mui/material";

export const DataComponent = () => {
  return (
    <div>
      <flexbox>
        <Paper elevation={12}>
          <Grid container spacing={3}>
            <Grid item sx={6}>
              <Card className="openWeather">
                <OpenWeatherComponent></OpenWeatherComponent>
              </Card>
            </Grid>
            <Grid item sx={6}>
              <Card className="liveData">
                <liveData></liveData>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </flexbox>
    </div>
  );
};
