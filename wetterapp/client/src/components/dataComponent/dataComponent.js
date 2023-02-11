import { Paper, Card } from "@mui/material";
import { OpenWeatherComponent } from "./openWeatherComponent.js";
import { Grid } from "@mui/material";

export const DataComponent = () => {
  return (
    <div>
      <Paper elevation={24}>
        <Grid container spacing={3}>
          <Grid item sx={6}>
            <Card>
              <OpenWeatherComponent></OpenWeatherComponent>
            </Card>
          </Grid>
          <Grid item sx={6}>
            <Card>test</Card>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};
