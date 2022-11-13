import {
  ChartComponent,
  Inject,
  LineSeries,
  SeriesCollectionDirective,
  SeriesDirective,
  Category,
  DataLabel,
} from "@syncfusion/ej2-react-charts";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import TempChart from "./components/Charts/tempChart.js";

import { getEntries } from "../../actions/entries";

export default function TempChart() {
  const dispatch = useDispatch();
  const entries = useSelector((state) => state.entries);

  useEffect(() => {
    dispatch(getEntries());
  }, [dispatch]);

  console.log(entries);

  let chartData = entries.data;

  const dn = new Date();
  let dlm = new Date(dn.getTime());
  dlm.setDate(dn.getDate() - 10);

  console.log("dn ", dn);
  console.log("dlm", dlm);
  // console.log("sample: ", chartData[100].createdAt);

  // let d = new Date(chartData[100].createdAt);

  // console.log("eval: ", d.getDate() > dlm.getDate());
  chartData = chartData.filter((d) => {
    // console.log("d ", d.createdAt);
    let da = new Date(d.createdAt);
    return da.getTime() > dlm.getTime();
  });

  console.log("cd: ", chartData);

  return (
    <div>
      <ChartComponent
        title="Temperatur"
        primaryXAxis={{ valueType: "Category", title: "Time" }}
        primaryYAxis={{ title: "Temperatur", minimum: 0 }}
      >
        <Inject services={[LineSeries, Category, DataLabel]}></Inject>
        <SeriesCollectionDirective>
          <SeriesDirective
            type="Line"
            dataSource={chartData}
            xName="createdAt"
            yName="temp"
            marker={{ dataLabel: { visible: true }, visible: true }}
          ></SeriesDirective>
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
}
