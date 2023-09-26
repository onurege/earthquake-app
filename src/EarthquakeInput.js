import React, { useState } from "react";
import { NumericTextBox } from "@progress/kendo-react-inputs";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import {fetchEarthquakes} from './ApiInput'
import { MapContainer } from "./KendoMap";
import { ChartContainer } from "./Chart"

import './style.css'
import EarthquakeList from "./EarthquakeList";
const EarthquakeInput = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [limit, setLimit] = useState(0);
  const [earthquakes, setEarthquakes] = useState([]);
  const [counts, setCounts] = useState({});
  const [quakeStats, setQuakeStats] = useState({});


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await fetchEarthquakes(startDate, endDate, limit);
    setEarthquakes(data.normalizedData);
    console.log(666,data);
    /* setCounts(data.counts); */
    setQuakeStats(data.quakeStats);
  }
  

  return (
    <div>
        <form onSubmit={handleSubmit}>
      <div>
        <label>Start Date: </label>
        <DatePicker format={"yyyy-MM-dd"} value={startDate} onChange={(e) => setStartDate(e.value)} />
      </div>
      <div>
        <label>End Date: </label>
        <DatePicker format={"yyyy-MM-dd"} value={endDate} onChange={(e) => setEndDate(e.value)} />
      </div>
      <div>
        <label>Number of Quakes: </label>
        <NumericTextBox value={limit} onChange={(e) => setLimit(e.value)} />
      </div>
      <button type="submit">Submit</button>
    </form>
    <EarthquakeList earthquakes={quakeStats} /> 
    <MapContainer earthquakes={earthquakes} />
    {/* <ChartContainer earthquakes={counts} /> */}
  
    </div>
  
  );
};

export default EarthquakeInput;
