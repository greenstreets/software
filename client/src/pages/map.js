import Navbar from "../components/navbar.js";
import Footer from "../components/footer.js";
import React from "react";
import LeafletMap from "../components/mapComponent.js";
import HeatMap from "../components/heatMap.js";
import "../css/map.css";
const Map = () => {
  return (
    <div>
      <Navbar></Navbar>
        <LeafletMap></LeafletMap>
        {/* <HeatMap></HeatMap> */}
      <Footer></Footer>
    </div>
  );
};

export default Map;
