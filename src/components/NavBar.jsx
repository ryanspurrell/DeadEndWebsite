// NavBar.jsx

import React from "react";

import './NavBar.css';

function getOpenPage() {
  const loc = useLocation();
  console.log(loc);
}

class NavBar extends React.Component {
  
  onClick = (event) => {
    this.props.clickedLink(
      event.target.value
    );
    event.preventDefault();
  };

  render() {
    return (
      <nav className="navBar">
        <div onClick={this.onClick}>{this.props.children}</div>
      </nav>
    );
  }
}

export default NavBar;
