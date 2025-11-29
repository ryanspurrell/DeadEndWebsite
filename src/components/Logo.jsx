// Logo.jsx

import React from "react";

import './Logo.css';
import raven from '/images/logo_head.svg';

// This makes a logo which is clickable, takes you back to main page
function Logo() {

  return (
    <button className="logoButton">
      <img src={raven} className="logoImage" />
    </button>
  );
}

export default Logo;
