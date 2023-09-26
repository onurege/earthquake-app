import * as React from "react";
import { Map, MapLayers, MapBubbleLayer, MapTileLayer, MapBubbleLayerTooltip } from '@progress/kendo-react-map';
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
const renderBubbleTooltip = props => <span>{props.dataItem.title} ({props.dataItem.mag}): {props.value}</span>;


export const MapContainer = ({earthquakes}) => {

<div>
      <Map center={center} zoom={5}>
        <MapLayers>
          <MapTileLayer urlTemplate={tileUrl} subdomains={tileSubdomains} attribution={attribution} />
          <MapBubbleLayer data={earthquakes} locationField="geojson.coordinates" valueField="mag" style={bubbleStyle}>
            <MapBubbleLayerTooltip render={renderBubbleTooltip} />
          </MapBubbleLayer>
        </MapLayers>
      </Map>
      {console.log(111,earthquakes)}
    </div>
}
