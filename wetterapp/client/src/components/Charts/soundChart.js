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

export const SoundChart = (props) => {
    return (
    <div>
      {props.dataFromParent.loading && <div>loading...</div>}
      {!props.dataFromParent.loading && props.dataFromParent.error ? (
        <div>Error: {props.dataFromParent.error}</div>
      ) : null}
      {!props.dataFromParent.loading && props.dataFromParent.entries ? (
        <ChartComponent
          title="Lautstärke"
          primaryXAxis={{ valueType: "Category", title: "Time" }}
          primaryYAxis={{ title: "Lautstärke 0-100", minimum: 0 }}
          zoomSettings={{
            enableSelectionZooming: true,
            enablePan: false,
            enableScrollbar: true,
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
              dataSource={props.dataFromParent.entries}
              xName="createdAt"
              yName="humidity"
              // marker={{ dataLabel: { visible: true }, visible: false }}
            ></SeriesDirective>
          </SeriesCollectionDirective>
        </ChartComponent>
      ) : null}
    </div>
  );
};
