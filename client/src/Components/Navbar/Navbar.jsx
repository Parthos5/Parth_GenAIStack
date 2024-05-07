import React from "react";
import genstacklogo from "../../assets/genaistacklogo.png";
import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="navbarDiv">

      {/* Logo and Company name div starts */}
      <div className="logoDiv">
        <img className="companyLogoImg" src={genstacklogo} alt="" />{" "}
        <h3>GenAI Stack</h3>
      </div>
      {/* Logo and Company name div ends */}

      {/* Profile Icon*/}
      <div className="profile">S</div>
      {/* Profile Icon sends */}
      
    </div>
  );
}
