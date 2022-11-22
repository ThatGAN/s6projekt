import PersistentDrawerLeft from "./components/header";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChartsCombine } from "./components/Charts/chartsCombine.js";

function App() {
  useEffect(() => {
    console.log("test");
  }, []);
  // const entries = useSelector((state) => state.entries);
  return (
    <div>
      <PersistentDrawerLeft></PersistentDrawerLeft>

      <ChartsCombine></ChartsCombine>
    </div>
  );
}

export default App;
