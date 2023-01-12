import {
  ChartComponent,
  Inject,
  LineSeries,
  SeriesCollectionDirective,
  SeriesDirective,
  Category,
  DataLabel,
  Zoom,
  ScrollBar,
} from "@syncfusion/ej2-react-charts";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import TempChart from "./components/Charts/tempChart.js";

import { fetchEntries } from "./entrySlice.js";

export const PressureChart = () => {
  let entries = useSelector((state) => state.entry);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEntries());
  }, []);

  let chartData = entries.entries;

  let margin = { left: 40, right: 40 };

  return (
    <div>
      {entries.loading && <div>loading...</div>}
      {!entries.loading && entries.error ? (
        <div>Error: {entries.error}</div>
      ) : null}
      {!entries.loading && entries.entries ? (
        <ChartComponent
          title="Luftdruck"
          primaryXAxis={{ valueType: "Category", title: "Time" }}
          primaryYAxis={{ title: "Luftdruck in pa", minimum: 0 }}
          zoomSettings={{
            enableSelectionZooming: true,
            enablePan: false,
            //enableScrollbar: true,
            toolbarItems: ["ZoomIn", "ZoomOut", "Reset", "Pan"],
          }}
          // margin={margin}
        >
          <Inject
            services={[LineSeries, Category, DataLabel, Zoom, ScrollBar]}
          ></Inject>
          <SeriesCollectionDirective>
            <SeriesDirective
              type="Line"
              dataSource={chartData}
              xName="createdAt"
              yName="pressure"
              // marker={{ dataLabel: { visible: true }, visible: false }}
            ></SeriesDirective>
          </SeriesCollectionDirective>
        </ChartComponent>
      ) : null}
    </div>
  );
};
