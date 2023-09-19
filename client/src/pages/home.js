import logo from "../images/logo.svg";
import "../css/home.css";
import Navbar from "../components/navbar.js";
import Footer from "../components/footer.js";
import React, { useState, useEffect } from "react";
import { useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import TestChart from "../components/testChart.js"

function Home() {
  console.log("home");
  const signOut = useSignOut();
  const navigate = useNavigate();
  const logout = () => {
    signOut();
    navigate("/");
  };
  async function test() {
    const accessToken = Cookies.get("_auth");
    console.log(accessToken);
    const response = await fetch("http://localhost:8000/users", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    console.log(data);
  }
  return (
    <div>
      <Navbar></Navbar>
      <div className="App">
        <header className="App-header">
        <TestChart/>
          <button onClick={logout}>Logout</button>
          <button onClick={test}>Test</button>
        </header>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Home;
