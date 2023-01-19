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

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";

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

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const updateEntries = () => {
    console.log("CALLED UPDATE!");
    dispatch(fetchEntries()).then((res) => {
      console.log("payload: ", res.payload);
      var startDate = new Date(date[0].startDate);
      // startDate.setDate(startDate.getDate() - 1);
      var endDate = new Date(date[0].endDate);
      console.log("start date: ", startDate);
      console.log("end date: ", endDate);

      res.payload = res.payload.filter((entry) => {
        // console.log("entry: ", entry);
        const entryDate = new Date(entry.createdAt);
        if (entryDate > startDate && entryDate < endDate) return true;
        else return false;
      });

      let formattedEntries = res.payload.map((val) => {
        let obj = {
          _id: val._id,
          temp: val.temp,
          createdAt: val.createdAt,
        };
        return obj;
      });

      let formattedEntriesHumidity = res.payload.map((val) => {
        let obj = {
          _id: val._id,
          humidity: val.humidity,
          createdAt: val.createdAt,
        };
        return obj;
      });

      let formattedEntriesLights = res.payload.map((val) => {
        let obj = {
          _id: val._id,
          lights: val.lights,
          createdAt: val.createdAt,
        };
        return obj;
      });

      let formattedEntriesSound = res.payload.map((val) => {
        let obj = {
          _id: val._id,
          sound: val.sound,
          createdAt: val.createdAt,
        };
        return obj;
      });

      let formattedEntriesPressure = res.payload.map((val) => {
        let obj = {
          _id: val._id,
          pressure: val.pressure,
          createdAt: val.createdAt,
        };
        return obj;
      });

      let formattedEntriesGroundHumidity = res.payload.map((val) => {
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
      let ld = {
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
  };

  const updateEntriesOnDateChange = () => {
    updateEntries();
  };

  /*
    1. StartDate und EndDate vom Rangepicker ans Backend übergeben und dort nur die gefilterten Einträge zurückgeben
    2. Sensordaten Preprocessing besser zusammenfassen
    3. Date Umwandlung zentral anlegen
  */

  const dispatch = useDispatch();
  useEffect(() => {
    updateEntries();
  }, []);
  // console.log("hum:", humidityData);

  return (
    <div>
      {entries.loading && <div>loading...</div>}
      {!entries.loading && entries.error ? (
        <div>Error: {entries.error}</div>
      ) : null}
      {!entries.loading && tempData ? (
        <div className="wrapper">
          <DateRangePicker
            onChange={(item) => {
              setDate([item.selection]);
              console.log("STATE: ", date);
              updateEntriesOnDateChange();
            }}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={date}
            direction="horizontal"
          />

          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
              <Grid item xs>
                <TempChart dataFromParent={tempData}></TempChart>
              </Grid>

              <Grid item xs>
                <HumidityChart dataFromParent={humidityData}></HumidityChart>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs>
                <LightsChart dataFromParent={lightsData}></LightsChart>
              </Grid>

              <Grid item xs>
                <SoundChart dataFromParent={soundData}></SoundChart>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs>
                <PressureChart dataFromParent={pressureData}></PressureChart>
              </Grid>

              <Grid item xs></Grid>
            </Grid>
          </Box>
        </div>
      ) : null}
    </div>
  );
};
