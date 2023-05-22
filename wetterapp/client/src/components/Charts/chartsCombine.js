import { TempChart } from "./tempChart.js";
import { HumidityChart } from "./humidityChart.js";
import { LightsChart } from "./lightsChart.js";
import { SoundChart } from "./soundChart.js";
import { PressureChart } from "./pressureChart.js";

import { Grid, Button } from "@mui/material";
import Box from "@mui/material/Box";
import "./chartsCombine.css";
import { DataComponent } from "../dataComponent/dataComponent.js";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";

import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { fetchEntries } from "../Slices/entrySlice.js";

import { WeatherMap } from "../Maps/weatherMap.js";

/*
08.03
ToDo:
1.Selected Station über function übergeben(currying)
2. openWeatherComponent Api call ins backend fertig
3. liveData component abfrage an den letzten Eintrag der API
DONE
*/

export const ChartsCombine = () => {
  const dispatch = useDispatch();

  let entries = useSelector((state) => state.entry);
  const [tempData, setTempData] = useState({});
  const [humidityData, setHumidityData] = useState({});
  const [lightsData, setLightsData] = useState({});
  const [soundData, setSoundData] = useState({});
  const [pressureData, setPressureData] = useState({});
  const [groundHumidityData, setGroundHumidityData] = useState({});
  const [lastEntry, setLastEntry] = useState({});

  let selectedStation = useSelector((state) => state.station.selectedStation);
  console.log("Selected Station:", selectedStation);

  const [date, setDate] = useState([
    {
      startDate: addDays(new Date(), -7),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [showComponentA, setShowComponentA] = useState(true);

  const toggleComponent = () => {
    setShowComponentA(!showComponentA);
  };

  const location = useSelector(
    (state) => state.station.selectedStation.location
  );

  useEffect(
    () => {
      updateEntries();
      console.log("Date:", date[0].endDate);
    },
    [date[0].endDate, location],
    []
  );

  const updateEntries = () => {
    console.log("CALLED UPDATE!");
    console.log("here", selectedStation._id);

    dispatch(fetchEntries(selectedStation._id)).then((res) => {
      console.log("payload: ", res.payload);
      var startDate = new Date(date[0].startDate - 7);
      // startDate.setDate(startDate.getDate() - 1);
      var endDate = new Date(date[0].endDate);
      console.log("start date: ", startDate);
      console.log("end date: ", endDate);

      const lastEntryPayload = res.payload[res.payload.length - 1];

      res.payload = res.payload.filter((entry) => {
        // console.log("entry: ", entry);
        const entryDate = new Date(entry.createdAt);
        if (entryDate > startDate && entryDate < endDate) return true;
        else return false;
      });

      let formattedEntries = res.payload.map((val) => {
        let obj = {
          _id: val._id,
          temp: val.temperature,
          createdAt: val.createdAt,
        };
        return obj;
      });
      console.log("Formatted:", formattedEntries);

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
          lights: val.illuminance,
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
      setLastEntry(lastEntryPayload);
      setTempData(td);
      setHumidityData(hd);
      setLightsData(ld);
      setSoundData(sd);
      setPressureData(pd);
      setGroundHumidityData(ghd);
    });
  };

  /*
    1. StartDate und EndDate vom Rangepicker ans Backend übergeben und dort nur die gefilterten Einträge zurückgeben
    2. Sensordaten Preprocessing besser zusammenfassen
    3. Date Umwandlung zentral anlegen
  */

  let currentSelection;

  const getCharts = () => {
    return (
      <Box xs={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={sp}>
            <TempChart dataFromParent={tempData}></TempChart>
          </Grid>

          <Grid item xs={sp}>
            <HumidityChart dataFromParent={humidityData}></HumidityChart>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={sp}>
            <LightsChart dataFromParent={lightsData}></LightsChart>
          </Grid>

          <Grid item xs={sp}>
            <SoundChart dataFromParent={soundData}></SoundChart>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={sp}>
            <PressureChart dataFromParent={pressureData}></PressureChart>
          </Grid>

          <Grid item xs={sp}></Grid>
        </Grid>
      </Box>
    );
  };

  const getComponent = () => {
    switch (currentSelection) {
      case "normalHeader":
        return (
          <>
            <Grid container spacing={3}>
              <Grid item sx={6}>
                <DateRangePicker
                  className="dateRange"
                  onChange={(item) => {
                    setDate([item.selection]);
                    console.log("STATE: ", date);
                    // updateEntriesOnDateChange();
                  }}
                  showSelectionPreview={true}
                  retainEndDateOnFirstSelection={true}
                  // shownDate={(startOfMonth(new Date()), d)}
                  preventSnapRefocus={true}
                  months={2}
                  ranges={date}
                  direction="horizontal"
                  calendarFocus="forwards"
                />
              </Grid>
              <Grid item xs={6}>
                <DataComponent dataFromParent={lastEntry}></DataComponent>
              </Grid>
            </Grid>
            {getCharts()}
          </>
        );
      case "mobileHeader":
        return (
          <div>
            {showComponentA ? (
              <DataComponent dataFromParent={lastEntry}></DataComponent>
            ) : (
              <div>
                <div className="mobileHeader2">
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => {
                      setDate([item.selection]);
                      console.log("STATE: ", date);
                      // updateEntriesOnDateChange();
                    }}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    retainEndDateOnFirstSelection={true}
                    // style={{ position: "center" }}
                    // shownDate={(startOfMonth(new Date()), d)}
                  />
                </div>
                <div> {getCharts()}</div>
              </div>
            )}
            <button
              style={{ position: "fixed", bottom: "10px", left: "10px" }}
              onClick={toggleComponent}
            >
              Toggle Component
            </button>
          </div>
        );
    }
  };

  // let d = new Date();

  // console.log("Date: ", d);

  let sp;

  var x = window.matchMedia("(max-width: 700px)");
  if (x.matches) {
    sp = 12;
    currentSelection = "mobileHeader";
  } else {
    sp = 6;
    currentSelection = "normalHeader";
  }

  const Element = () => (
    <div>
      {entries.loading && <div>loading...</div>}
      {!entries.loading && entries.error ? (
        <div>Error: {entries.error}</div>
      ) : null}
      {!entries.loading && tempData ? (
        <div className="wrapper">
          <Button onClick={updateEntries}>Reload</Button>
          {getComponent()}
        </div>
      ) : null}
    </div>
  );
  return <Element></Element>;
};
