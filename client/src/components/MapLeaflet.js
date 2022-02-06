import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  LayerGroup,
  useMapEvents,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import md5 from "md5";
import { useNavigate } from "react-router-dom";
import { data } from "./data";
import * as L from "leaflet";
import Airports from "./Airports";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapLeaflet = () => {
  const [map, setMap] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const checkLogin = localStorage.getItem("login");
    if (md5("TestTDM") !== checkLogin) {
      navigate("/");
    }
  }, []);

  const iconL = L.icon({
    iconUrl: "./air.png",
    iconSize: [20, 20],
  });

  const MyLocation = () => {
    const maps = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        map.flyTo(e.latlng, map.getZoom());
      },
    });
    // let coorFly = { lat: 13, lng: 100 };
    // map.flyTo(coorFly, 10);
    return null;
  };

  return (
    <div>
      {/* <button onClick={myLocation}>My location</button> */}
      <MapContainer
        center={[13, 100]}
        zoom={6}
        style={{ height: "100vh" }}
        whenCreated={setMap}
      >
        <MyLocation />
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="CyclOSM">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
              maxZoom={20}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="OpenStreetMap">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="OpenTopoMap">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.Overlay checked name="Airports">
            <LayerGroup>
              <MarkerClusterGroup>
                <Airports />
              </MarkerClusterGroup>
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  );
};

export default MapLeaflet;
