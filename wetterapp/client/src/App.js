import PersistentDrawerLeft from "./components/Header/header";
import React from "react";
import { ChartsCombine } from "./components/Charts/chartsCombine.js";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "./assets/ezgif.com-resize.gif";
import pic from "./assets/IMG_20230116_094221.jpg";
import { Scrollbars } from "react-custom-scrollbars";

import "./App.css";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  return (
    <>
      {user?.result ? (
        <div>
          <PersistentDrawerLeft></PersistentDrawerLeft>
          <ChartsCombine></ChartsCombine>
        </div>
      ) : (
        <div className="Container">
          <div className="Bar">WeatherStation</div>

          <div className="large-box">
            <h2>Willkommen</h2>
            <div className="inner-box">
              <Scrollbars style={{ height: CurrentSize }}>
                <img className="pic" src={pic} alt="loading..."></img>
                <p style={{ fontSize: "1rem" }}>
                  Um die Station für einen Account zu regrisrieren befolgen Sie
                  die folgenden 3 Schritte:
                </p>
              </Scrollbars>
            </div>

            <div className="bottom-section">
              <div className="left-section">
                <img className="logo" src={logo} alt="loading..."></img>
              </div>
              <div className="middle-section"></div>
              <div className="right-section">
                <Button
                  className="button"
                  component={Link}
                  to="/auth"
                  variant="contained"
                  color="primary"
                >
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

let CurrentSize;

var x = window.matchMedia("(max-width: 600px)");
if (x.matches) {
  CurrentSize = 450;
} else {
  CurrentSize = 600;
}

export default App;
