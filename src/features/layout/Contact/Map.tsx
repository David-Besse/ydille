"use client";

// START: Preserve spaces to avoid auto-sorting
import "leaflet/dist/leaflet.css";

import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";

import "leaflet-defaulticon-compatibility";
// END: Preserve spaces to avoid auto-sorting
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default function Map() {
  return (
      <MapContainer
        preferCanvas={true}
        center={[44.461933, -1.19844]}
        zoom={11}
        scrollWheelZoom={true}
        // style={{ height: "400px", width: "600px" }}
        className="h-[400px] w-[600px] rounded-2xl"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[44.46193, -1.19844]}>
          <Popup>
            <strong>IDYLLE RESTAURANT</strong><br /><br />
            18 chemin de Maguide<br />
            40600 Biscarosse<br />
            France<br />
            tel: 05 58 09 87 14<br />
            mail: nHg7H@example.com
          </Popup>
        </Marker>
      </MapContainer>
  );
}
