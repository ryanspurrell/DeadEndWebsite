// NavBar.jsx

import React from "react";

import './NavBar.css';

function NavBar(props) {

  const className = props.className;
  const children = props.children;

  return (
    <nav className={className}>
      <div>{children}</div>
    </nav>
  );
}

export default NavBar;
