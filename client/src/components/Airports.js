import React from "react";
import { Marker, Popup } from "react-leaflet";
import { data } from "./data";
import * as L from "leaflet";

const Airports = () => {
  const iconL = L.icon({
    iconUrl: "./air.png",
    iconSize: [20, 20],
  });
  console.log(data);
  return data.map((item, index) => {
    return (
      <Marker key={index} position={[item.LAT, item.LON]} icon={iconL}>
        <Popup>
          <table className="table table-striped">
            <tr>
              <td>Name</td>
              <td>{item.LM_TNAME}</td>
            </tr>
            <tr>
              <td>LAT</td>
              <td>{item.LAT}</td>
            </tr>
            <tr>
              <td>LON</td>
              <td>{item.LON}</td>
            </tr>
          </table>
        </Popup>
      </Marker>
    );
  });
};

export default Airports;
