import Navbar from "../components/navbar.js";
import Footer from "../components/footer.js";
import React from "react";
import LeafletMap from "../components/mapComponent.js";
import HeatMap from "../components/heatMap.js";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useState} from "react";
import "../css/map.css";
const Map = () => {
  // const [checked, setChecked] = React.useState(true);

  // const handleChange = (event) => {
  //   console.log("QWEQWT")
  //   setChecked(event.target.checked);
  // };

  const [isActive, setIsActive] = useState(true);

  const toggle = () => {
    setIsActive(!isActive);
  };

  return (
    <div>
      <Navbar></Navbar>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              onChange={toggle}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
          label="Toggle Heat Map"
        />
      </FormGroup>
      <div>
        {isActive ? <LeafletMap></LeafletMap> : <HeatMap></HeatMap>}
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Map;
