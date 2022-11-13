import PersistentDrawerLeft from "./components/header";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TempChart from "./components/Charts/tempChart.js";

import { getEntries } from "./actions/entries";

function App() {
  return (
    <div>
      <PersistentDrawerLeft></PersistentDrawerLeft>

      <TempChart></TempChart>
    </div>
  );
}

export default App;
