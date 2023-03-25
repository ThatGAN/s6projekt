import PersistentDrawerLeft from "./components/Header/header";
import React from "react";
import { ChartsCombine } from "./components/Charts/chartsCombine.js";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import { useState } from "react";

import "./App.css";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const classes = useStyles();

  return (
    <>
      {user?.result ? (
        <div>
          <PersistentDrawerLeft></PersistentDrawerLeft>
          <ChartsCombine></ChartsCombine>
        </div>
      ) : (
        <div>
          <div className="emptyBar">WeatherStation</div>
          <Button
            className={classes.logout}
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        </div>
      )}
    </>
  );
}

export default App;
