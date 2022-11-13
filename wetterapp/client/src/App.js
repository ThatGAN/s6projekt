import PersistentDrawerLeft from "./components/header";
import React, { useState, useEffect } from "react";
import {
  ChartComponent,
  Inject,
  LineSeries,
  SeriesCollectionDirective,
  SeriesDirective,
  Category,
} from "@syncfusion/ej2-react-charts";
import { DataManager, WebApiAdaptor } from "@syncfusion/ej2-data";

function App() {
  
  return (
    <div>
      <PersistentDrawerLeft></PersistentDrawerLeft>

      <ChartComponent
        title="Sales Analysis"
        primaryXAxis={{ valueType: "Category", title: "Time" }}
        primaryYAxis={{ title: "Temperatur" }}
      >
        <Inject services={[LineSeries, Category]}></Inject>
        <SeriesCollectionDirective>
          <SeriesDirective
            type="Line"
            dataSource={data1}
            xName="x"
            yName="y"
          ></SeriesDirective>
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
}

export default App;
