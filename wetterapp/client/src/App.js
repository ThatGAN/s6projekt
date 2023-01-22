import PersistentDrawerLeft from "./components/Header/header";
import React, { useEffect } from "react";
import { ChartsCombine } from "./components/Charts/chartsCombine.js";

function App() {
  return (
    <div>
      <PersistentDrawerLeft></PersistentDrawerLeft>
      <ChartsCombine></ChartsCombine>
    </div>
  );
}

export default App;
