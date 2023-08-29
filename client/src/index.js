import React from "react";
import ReactDOM from "react-dom/client";
import { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home.js";
import reportWebVitals from "./reportWebVitals";
import About from "./pages/about.js";
import Map from "./pages/map.js";
import NoPage from "./pages/noPage.js";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/about-us" element={<About />}></Route>
          <Route exact path="/map" element={<Map />}></Route>
          <Route exact path="*" element={<NoPage />}></Route>
        </Routes>
      </div>
    </Router>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
