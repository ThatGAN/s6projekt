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

export const TempChart = (props) => {
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
          title="Temperatur"
          primaryXAxis={{ valueType: "Category", title: "Time" }}
          primaryYAxis={{ title: "Temperatur", minimum: 0 }}
          // zoomSettings={{ enableSelectionZooming: true }}
          position="absolute"
        >
          <Inject services={[LineSeries, Category, DataLabel, Zoom]}></Inject>
          <SeriesCollectionDirective>
            <SeriesDirective
              type="Line"
              dataSource={props.dataFromParent.entries}
              xName="formattedCreatedAt"
              yName="temp"
              // marker={{ dataLabel: { visible: true }, visible: false }}
            ></SeriesDirective>
          </SeriesCollectionDirective>
        </ChartComponent>
      ) : null}
    </div>
  );
};
