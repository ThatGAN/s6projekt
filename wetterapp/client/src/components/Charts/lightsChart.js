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

export const LightsChart = (props) => {
  // var createdAtOrg = new Date(props.dataFromParent.entries[0].createdAt);

  if (props.dataFromParent.entries?.length) {
    props.dataFromParent.entries.map((entry) => {
      const tempCreatedAt = new Date(entry.createdAt);

      var formattedCreatedAt =
        tempCreatedAt.getDate() + "/" + (tempCreatedAt.getMonth() + 1);

      entry.formattedCreatedAt = formattedCreatedAt;
    });
  }

  // console.log("CreatedAt:", createdAtOrg);
  // createdAtOrg = createdAtOrg.getDate() + "." + createdAt.getMonth();

  // console.log("Split", createdAtOrg.toISOString().split("T")[1].split(".")[0]);

  return (
    <div>
      {props.dataFromParent.loading && <div>loading...</div>}
      {!props.dataFromParent.loading && props.dataFromParent.error ? (
        <div>Error: {props.dataFromParent.error}</div>
      ) : null}
      {!props.dataFromParent.loading && props.dataFromParent.entries ? (
        <ChartComponent
          title="Helligkeit"
          primaryXAxis={{ valueType: "Category", title: "Time" }}
          primaryYAxis={{ title: "Helligkeit 0-75", minimum: 0 }}
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
              dataSource={props.dataFromParent.entries}
              xName="formattedCreatedAt"
              yName="lights"
              // marker={{ dataLabel: { visible: true }, visible: false }}
            ></SeriesDirective>
          </SeriesCollectionDirective>
        </ChartComponent>
      ) : null}
    </div>
  );
};
