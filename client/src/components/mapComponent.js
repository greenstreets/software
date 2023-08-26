import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";

//create custom icon
const customIcon = new Icon({
  // iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconUrl: require("../images/marker-icon.png"),
  iconSize: [25, 40], // size of the icon
});

const LeafletMap = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    fetch("http://localhost:8000/api/markers") // Replace with your actual backend URL
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  //TO DO SOLVE WHY PAGES ARE HITTING BACKEND MULTIPLE TIMES- POTENTIALLY AS A RESULT OF NOT HAIVING "PREVENT DEFAULT"
//   if (data.length == 0) {
//     console.log("DATA DEAD");
//   }

  const position = [-27.470125, 153.021072]; // Latitude and longitude

  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* Mapping through the markers */}
      {data.map((marker) => (
        <Marker position={marker.geocode} icon={customIcon}>
          <Popup>some text</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LeafletMap;
