import React from "react";
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import "../css/navbar.css";
import logo from "../images/greenstreets_globe.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <div>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        ></link>

        <nav className={`navbar-table ${isMenuOpen ? "open" : ""}`}>
          <table>
            <tbody>
              <tr>
              <td className="logo-cell">
                  <img src={logo} alt="Logo" />
                </td>
                <td className="nav-buttons">
                  <div
                    className={`menu-toggle ${isMenuOpen ? "open" : ""}`}
                    onClick={toggleMenu}
                  >
                    <a className="icon">&#9776;</a>
                  </div>
                  <ul className={`menu ${isMenuOpen ? "open" : ""}`}>
                    <li className={isMenuOpen ? "active-top" : ""}>
                      <a href="/">Home</a>
                    </li>
                    <li className={isMenuOpen ? "active" : ""}>
                      <a href="/about-us">About</a>
                    </li>
                    <li className={isMenuOpen ? "active" : ""}>
                      <a href="/map">Map</a>
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </nav>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
