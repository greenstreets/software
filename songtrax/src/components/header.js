import React from 'react';
import { Link } from "react-router-dom";
function Header() {
    return (
        <div>
            <header className="page-header">
            <div className="header-logo">
                <h2>
                    <Link to = "/" className="header-icon-link">Create Sample</Link>
                </h2>
            </div>
            <div className="header-app-description">
                <span>Create & Share Location Based Music Samples!</span>
            </div>
            </header>
        </div>
    );
  }

export default Header;


