import {
  ChartComponent,
  Inject,
  LineSeries,
  SeriesCollectionDirective,
  SeriesDirective,
  Category,
  DataLabel,
  Zoom,
} from "@syncfusion/ej2-react-charts";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchEntries } from "./entrySlice.js";

export const TempChart = () => {
  let entries = useSelector((state) => state.entry);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEntries());
  }, []);

  console.log("entries: ", entries);

  let chartData = entries.entries;

  return (
    <div>
      {entries.loading && <div>loading...</div>}
      {!entries.loading && entries.error ? (
        <div>Error: {entries.error}</div>
      ) : null}
      {!entries.loading && entries.entries ? (
        <ChartComponent
          title="Temperatur"
          primaryXAxis={{ valueType: "Category", title: "Time" }}
          primaryYAxis={{ title: "Temperatur", minimum: 0 }}
          zoomSettings={{ enableSelectionZooming: true }}
        >
          <Inject services={[LineSeries, Category, DataLabel, Zoom]}></Inject>
          <SeriesCollectionDirective>
            <SeriesDirective
              type="Line"
              dataSource={chartData}
              xName="createdAt"
              yName="temp"
              // marker={{ dataLabel: { visible: true }, visible: false }}
            ></SeriesDirective>
          </SeriesCollectionDirective>
        </ChartComponent>
      ) : null}
    </div>
  );
};
