import { useState, useEffect, useCallback } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";
import { addressPoints } from "./addresspoints.js";

export default function HeatMap() {
  // State to store the fetched data
  const [data, setData] = useState(null);

  useEffect(() => {
    const map = L.map("map").setView([-27.4679, 153.0281], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);

    // Heatmap layer
    const heatmapLayer = L.heatLayer([], { radius: 25 }).addTo(map);
    heatmapLayer.setOptions({max:.0001});

    fetch("http://localhost:8000/api/heatmap")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((result) => {
        // Update the state with the fetched data
        const heatmapData = result; // Replace this with the data structure you receive
        heatmapLayer.setLatLngs(heatmapData); // Set heatmap data
        setData(result);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  return <div id="map" style={{ height: "500px" }}></div>;
}
