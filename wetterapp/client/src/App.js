import PersistentDrawerLeft from "./components/Header/header";
import SwipeableTemporaryDrawer from "./components/Header/mobileHeader.tsx";
import React, { useEffect } from "react";
import { ChartsCombine } from "./components/Charts/chartsCombine.js";
import "./App.css";

function App() {
  var x = window.matchMedia("(max-width: 700px)");
  if (x.matches) {
    return (
      <>
        <div>
          <div className="tempDrawer">
            <SwipeableTemporaryDrawer></SwipeableTemporaryDrawer>
          </div>
          <div className="mobileCharts">
            <ChartsCombine></ChartsCombine>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div>
          <PersistentDrawerLeft></PersistentDrawerLeft>
          <ChartsCombine></ChartsCombine>
        </div>
      </>
    );
  }
}

export default App;
