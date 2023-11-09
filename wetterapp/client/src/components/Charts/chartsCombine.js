import { TempChart } from "./tempChart.js";
import { HumidityChart } from "./humidityChart.js";
import { LightsChart } from "./lightsChart.js";
import { SoundChart } from "./soundChart.js";
import { PressureChart } from "./pressureChart.js";
import { GroundHumidityChart } from "./groundHumidityChart.js";

import { Grid, Button } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
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

  console.log(
    "entry:",
    useSelector((state) => state.entry)
  );

  let selectedStation = useSelector((state) => state.station.selectedStation);

  console.log("Station:", selectedStation);

  const [date, setDate] = useState([
    {
      startDate: addDays(new Date(), -7),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  console.log("DateObject:", typeof date);

  const [showComponent, setShowComponent] = useState(true);

  const toggleComponent = () => {
    setShowComponent(!showComponent);
  };

  const location = useSelector(
    (state) => state.station.selectedStation.location
  );

  useEffect(() => {
    updateEntries();
  }, [date[0].endDate, location]);

  const objectToPass = [selectedStation._id, date];
  console.log(objectToPass);

  const updateEntries = () => {
    dispatch(fetchEntries(objectToPass)).then((res) => {
      var startDate = new Date(date[0].startDate - 7);
      var endDate = new Date(date[0].endDate);

      console.log(res.payload);

      const lastEntryPayload = res.payload[res.payload.length - 1];

      try {
        res.payload = res.payload.filter((entry) => {
          const entryDate = new Date(entry.createdAt);
          if (entryDate > startDate && entryDate < endDate) return true;
          else return false;
        });
      } catch (error) {
        console.log("ERROR:", error);
        return error;
      }

      let formattedEntries = res.payload.map((val) => {
        let obj = {
          _id: val._id,
          temp: val.temperature,
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
        // loading: entries.loading,
        error: entries.error,
        entries: formattedEntries,
      };
      let hd = {
        // loading: entries.loading,
        error: entries.error,
        entries: formattedEntriesHumidity,
      };
      let ld = {
        // loading: entries.loading,
        error: entries.error,
        entries: formattedEntriesLights,
      };
      let sd = {
        // loading: entries.loading,
        error: entries.error,
        entries: formattedEntriesSound,
      };
      let pd = {
        // loading: entries.loading,
        error: entries.error,
        entries: formattedEntriesPressure,
      };
      let ghd = {
        // loading: entries.loading,
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

  let currentScreenSize;

  const getCharts = () => {
    const getChartDependingOnStation = () => {
      switch (selectedStation.name) {
        case "UNO R-3":
          return <SoundChart dataFromParent={soundData}></SoundChart>;
        case "MKR NB 1500":
          return (
            <GroundHumidityChart
              dataFromParent={groundHumidityData}
            ></GroundHumidityChart>
          );
      }
    };

    return (
      <div>
        {entries.loading && <div>loading...</div>}
        {!entries.loading && entries.error ? (
          <div>Error: {entries.error}</div>
        ) : null}
        {!entries.loading && tempData ? (
          <div className="wrapper">
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
                  {getChartDependingOnStation()}
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={sp}>
                  <PressureChart dataFromParent={pressureData}></PressureChart>
                </Grid>

                <Grid item xs={sp}></Grid>
              </Grid>
            </Box>
          </div>
        ) : null}
      </div>
    );
  };

  const getComponent = () => {
    switch (currentScreenSize) {
      case "normalHeader":
        return (
          <>
            <div className="flex-container">
              <div style={{ flex: 1 }}>
                <DateRangePicker
                  className="dateRange"
                  onChange={(item) => {
                    setDate([item.selection]);
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
              </div>
              <div style={{ flex: 1 }}>
                <DataComponent dataFromParent={lastEntry} />
              </div>
            </div>
            {getCharts()}
          </>
        );
      case "mobileHeader":
        return (
          <div className="test2">
            {showComponent ? (
              <DataComponent dataFromParent={lastEntry}></DataComponent>
            ) : (
              <div>
                <div className="mobileHeader2">
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => {
                      setDate([item.selection]);
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

            <TuneIcon
              style={{
                position: "fixed",
                bottom: "10px",
                left: "10px",
                borderRadius: "25px",
                backgroundColor: "Blue",
                color: "white",
              }}
              fontSize="medium"
              onClick={toggleComponent}
            />
          </div>
        );
    }
  };

  let sp;

  var x = window.matchMedia("(max-width: 700px)");
  if (x.matches) {
    sp = 12;
    currentScreenSize = "mobileHeader";
  } else {
    sp = 6;
    currentScreenSize = "normalHeader";
  }

  const Element = () => (
    <div className="element">
      {entries.loading && <div>loading...</div>}
      {!entries.loading && entries.error ? (
        <div>Error: {entries.error}</div>
      ) : null}
      {!entries.loading && tempData ? (
        <div className="wrapper">{getComponent()}</div>
      ) : null}
    </div>
  );
  return <Element></Element>;
};
