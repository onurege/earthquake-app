import * as React from 'react';
import { Map, MapBubbleLayer, MapBubbleLayerTooltip, MapLayers, MapTileLayer } from '@progress/kendo-react-map';
const center = [38.963745, 35.243322]
const tileSubdomains = ['a', 'b', 'c'];
const tileUrl = e => `https://${e.subdomain}.tile.openstreetmap.org/${e.zoom}/${e.x}/${e.y}.png`;
const attribution = '&copy; <a href="https://osm.org/copyright">OpenStreetMap contributors</a>';
const bubbleStyle = {
  fill: {
    color: 'orange',
    opacity: 0.5
  },
  stroke: {
    width: 1,
    color: 'black'
  }
};
const renderBubbleTooltip = props => <span>{props.City} ({props.Country}): {props.value}</span>;
export const MapContainer = ({ earthquakes }) =>{

earthquakes.sort((a, b) => new Date(b.Date) - new Date(a.Date))
const latestEarthquake = [earthquakes[0]];
const otherEarthquakes = earthquakes.slice(1);
return (<div>
    <Map center={center} zoom={6} minZoom={2}>
      <MapLayers>
        <MapTileLayer urlTemplate={tileUrl} subdomains={tileSubdomains} attribution={attribution} />
        <MapBubbleLayer data={otherEarthquakes} locationField="Location" valueField="Pop2010" attribution="Population data from Nordpil and UN Population Division." style={bubbleStyle}>
        <MapBubbleLayerTooltip render={renderBubbleTooltip} />
        </MapBubbleLayer>
        <MapBubbleLayer data={latestEarthquake} locationField="Location" valueField="Pop2010" attribution="Population data from Nordpil and UN Population Division." style={{...bubbleStyle, fill:{color: 'red'}}}>
        
          </MapBubbleLayer>
      </MapLayers>
    </Map>
  </div>)
}
