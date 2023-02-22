import PersistentDrawerLeft from "./components/Header/header";
import React from "react";
import { ChartsCombine } from "./components/Charts/chartsCombine.js";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <PersistentDrawerLeft></PersistentDrawerLeft>
        <ChartsCombine></ChartsCombine>
      </div>
    </>
  );
}

export default App;
