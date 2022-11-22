import { TempChart } from "./tempChart.js";
import { HumidityChart } from "./humidityChart.js";
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
          test
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
      </Box>
    </div>
  );
};
