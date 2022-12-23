import { TempChart } from "./tempChart.js";
import { HumidityChart } from "./humidityChart.js";
import { LightsChart } from "./lightsChart.js";
import { SoundChart } from "./soundChart.js";
import { PressureChart } from "./pressureChart.js";
import { Grid, Item } from "@mui/material";
import Box from "@mui/material/Box";
import "./chartsCombine.css";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import TextField from "@mui/material/TextField";

export const ChartsCombine = () => {
  let dateval = "";
  const dateChange = () => {
    console.log("date changed");
  };

  return (
    <div className="wrapper">
      <div className="date-picker-wrapper">
        <div className="date-picker">
          {/* <MobileDatePicker
            label="Date mobile"
            inputFormat="MM/DD/YYYY"
            value={dateval}
            onChange={dateChange}
            renderInput={(params) => <TextField {...params} />}
          /> */}
        </div>
      </div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs>
            <TempChart></TempChart>
          </Grid>

          <Grid item xs>
            <HumidityChart></HumidityChart>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs>
            <LightsChart></LightsChart>
          </Grid>

          <Grid item xs>
            <SoundChart></SoundChart>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs>
            <PressureChart></PressureChart>
          </Grid>

          <Grid item xs></Grid>
        </Grid>
      </Box>
    </div>
  );
};
