import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { fetchEarthquakes } from './ApiInput';
import { useState, useEffect } from 'react';

function EarthquakeList(quakeStats) {
    console.log(888,quakeStats);
   
    const quakeData = Object.entries(quakeStats.earthquakes).map(([location, stats]) => {
        console.log(999,location, stats);
        return { location, min: stats.min, max: stats.max };
    });
    console.log(777,quakeData);
    return ( <Grid data={quakeData}>
        <Column field="location" title="City" />
        <Column field="min" title="Min Magnitude" />
        <Column field="max" title="Max Magnitude" />
    </Grid>)}

export default EarthquakeList;