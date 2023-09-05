import { useState, useEffect, useCallback } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";
import { addressPoints } from "./addresspoints.js";



export default function HeatMap() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:8000/api/markers"); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setData(result);
      //data = setData;
    
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
  
  useEffect(() => {
    var map = L.map("map").setView([-27.4944, 153.0118], 12);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    
    const points = data
      ? data.map((p) => {
          return [p.Latitude, p.Longitude];
        })
      : [];

    L.heatLayer(points).addTo(map);
  }, []);

  return <div id="map" style={{ height: "100vh" }}></div>;
}
