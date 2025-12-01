// RNavBar.jsx

import React from "react";
import { loadIssues } from "../lib/loadIssues";

import './NavBar.css';

function RNavBar(props) {

  const currentPage = props.currentPage;
  const clickedLink = props.clickedLink;
  const className = props.className;
  const children = props.children;

  return (
    <nav className={className} onClick={clickedLink}>
      <div className={currentPage}>{children}</div>
    </nav>
  );
}

export default RNavBar;
