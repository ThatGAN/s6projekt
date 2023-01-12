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

import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { fetchEntries } from "./entrySlice.js";

export const ChartsCombine = () => {
  let entries = useSelector((state) => state.entry);
  const [tempData, setTempData] = useState({});
  const [humidityData, setHumidityData] = useState({});
  const [lightsData, setLightsData] = useState({});
  const [soundData, setSoundData] = useState({});
  const [pressureData, setPressureData] = useState({});
  const [groundHumidityData, setGroundHumidityData] = useState({});


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEntries()).then((res) => {
      let formattedEntries = entries.entries.map((val) => {
        let obj = {
          _id: val._id,
          temp: val.temp,
          createdAt: val.createdAt,
        };
        return obj;
      });

      let formattedEntriesHumidity = entries.entries.map((val) => {
        let obj = {
          _id: val._id,
          humidity: val.humidity,
          createdAt: val.createdAt,
        };
        return obj;
      });

      let formattedEntriesLights = entries.entries.map((val) => {
        let obj = {
          _id: val._id,
          light: val.light,
          createdAt: val.createdAt,
        };
        return obj;
      });

      let formattedEntriesSound = entries.entries.map((val) => {
        let obj = {
          _id: val._id,
          sound: val.sound,
          createdAt: val.createdAt,
        };
        return obj;
      });

      let formattedEntriesPressure = entries.entries.map((val) => {
        let obj = {
          _id: val._id,
          pressure: val.pressure,
          createdAt: val.createdAt,
        };
        return obj;
      });

      let formattedEntriesGroundHumidity = entries.entries.map((val) => {
        let obj = {
          _id: val._id,
          groundHumidity: val.groundHumidity,
          createdAt: val.createdAt,
        };
        return obj;
      });

      let td = {
        loading: entries.loading,
        error: entries.error,
        entries: formattedEntries,
      };
      let hd = {
        loading: entries.loading,
        error: entries.error,
        entries: formattedEntriesHumidity,
      };
      let ld  = {
        loading: entries.loading,
        error: entries.error,
        entries: formattedEntriesLights,
      };
      let sd = {
        loading: entries.loading,
        error: entries.error,
        entries: formattedEntriesSound,
      };
      let pd = {
        loading: entries.loading,
        error: entries.error,
        entries: formattedEntriesPressure,
      };
      let ghd = {
        loading: entries.loading,
        error: entries.error,
        entries: formattedEntriesGroundHumidity,
      };
      setTempData(td);
      setHumidityData(hd);
      setLightsData(ld);
      setSoundData(sd);
      setPressureData(pd);
      setGroundHumidityData(ghd);
    });
  }, []);

  console.log("entriesCombine:", entries);
  console.log("temp:", tempData);
  console.log("hum:", humidityData);

  return (
    <div>
      {entries.loading && <div>loading...</div>}
      {!entries.loading && entries.error ? (
        <div>Error: {entries.error}</div>
      ) : null}
      {!entries.loading && tempData ? (
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
                <TempChart dataFromParent={tempData}></TempChart>
              </Grid>

              {/* <Grid item xs>
                <HumidityChart dataFromParent={humidityData}></HumidityChart>
              </Grid> */}
            </Grid>
            {/* <Grid container spacing={3}>
              <Grid item xs>
                <LightsChart dataFromParent={lightsData}></LightsChart>
              </Grid>

              <Grid item xs>
               <SoundChart dataFromParent={soundData}></SoundChart>
              </Grid> */}
            {/* </Grid> */}
        <Grid container spacing={3}>
          {/* <Grid item xs>
            <PressureChart dataFromParent={pressureData}></PressureChart>
          </Grid> */}

          <Grid item xs></Grid>
        </Grid>
          </Box>
        </div>
      ) : null}
    </div>
  );
};
