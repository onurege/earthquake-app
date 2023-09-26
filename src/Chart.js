import * as React from "react";
import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartTitle,
  ChartLegend,
} from "@progress/kendo-react-charts";
import "hammerjs";
import { fetchEarthquakes } from "./ApiInput"; 

export const ChartContainer = (counts) => {
 /*  const [counts, setCounts] = React.useState(null);

  React.useEffect(() => {
    fetchEarthquakes().then((data) => {
        console.log(333,data)
      setCounts(data.counts);
    });
  }, []); */
  

  if (counts === null) {
    return <p>Loading...</p>;
  }

  const categories = Object.keys(counts.earthquakes);
  const series = [{ name: counts.earthquakes, data: counts.earthquakes }];
  console.log(333,counts)


  return (
    <div style={{ direction: "rtl" }}>
      <Chart>
        <ChartTitle text="İl Bazında Deprem Sayısı" />
        <ChartLegend position="top" orientation="horizontal" />
        <ChartCategoryAxis>
          <ChartCategoryAxisItem categories={categories} startAngle={45} />
        </ChartCategoryAxis>
        <ChartSeries>
          {series.map((item, idx) => (
            <ChartSeriesItem
              key={idx}
              type="column"
              data={item.data}
              name={item.name}
            />
          ))}
        </ChartSeries>
      </Chart>
    </div>
  );
};

