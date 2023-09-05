import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { useState, useEffect, useCallback } from "react";
import "leaflet/dist/leaflet.css";
import { addressPoints } from "./addresspoints.js";

//create custom icon
const customIcon = new Icon({
  // iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconUrl: require("../images/marker-icon.png"),
  iconSize: [25, 40], // size of the icon
});

const LeafletMap = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  // Define a useCallback function to fetch data from the backend
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:8000/api/markers"); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    // Call the fetchData function when the component mounts
    fetchData();
  }, [fetchData]);

  const position = [-27.4679, 153.0281]; // Latitude and longitude
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* Mapping through the markers */}
          {data.map((marker) => (
            <Marker
              position={[marker.Latitude, marker.Longitude]}
              icon={customIcon}
              eventHandlers={{
                click: (e) => {
                  const clickedMarkerToRemove = e.target;
                  clickedMarkerToRemove.removeFrom(clickedMarkerToRemove._map);
                  //TO DO REMOVE THE DATA FROM THE DATABASE VIA A CALL TO THE API
                },
              }}
            ></Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
};

export default LeafletMap;
