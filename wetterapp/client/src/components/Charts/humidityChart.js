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

import { fetchEntries } from "../Slices/entrySlice.js";

export const HumidityChart = (props) => {
  if (props.dataFromParent.entries?.length) {
    props.dataFromParent.entries.map((entry) => {
      const tempCreatedAt = new Date(entry.createdAt);

      var formattedCreatedAt =
        tempCreatedAt.getDate() +
        "/" +
        (tempCreatedAt.getMonth() + 1) +
        " " +
        tempCreatedAt.getHours() +
        ":" +
        tempCreatedAt.getMinutes();

      entry.formattedCreatedAt = formattedCreatedAt;
    });
  }
  return (
    <div>
      {props.dataFromParent.loading && <div>loading...</div>}
      {!props.dataFromParent.loading && props.dataFromParent.error ? (
        <div>Error: {props.dataFromParent.error}</div>
      ) : null}
      {!props.dataFromParent.loading && props.dataFromParent.entries ? (
        <ChartComponent
          title="Luftfeuchtigkeit"
          primaryXAxis={{ valueType: "Category", title: "Time" }}
          primaryYAxis={{ title: "Luftfeuchtigkeit in %", minimum: 0 }}
          zoomSettings={{
            enableSelectionZooming: true,
            enablePan: false,
            enableScrollbar: true,
            toolbarItems: ["ZoomIn", "ZoomOut", "Reset", "Pan"],
          }}
          position="absolute"
          size="auto"
          // margin={margin}
        >
          <Inject
            services={[LineSeries, Category, DataLabel, Zoom, ScrollBar]}
          ></Inject>
          <SeriesCollectionDirective>
            <SeriesDirective
              type="Line"
              dataSource={props.dataFromParent.entries}
              xName="formattedCreatedAt"
              yName="humidity"
              // marker={{ dataLabel: { visible: true }, visible: false }}
            ></SeriesDirective>
          </SeriesCollectionDirective>
        </ChartComponent>
      ) : null}
    </div>
  );
};
