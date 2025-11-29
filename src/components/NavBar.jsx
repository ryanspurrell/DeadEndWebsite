// NavBar.jsx

import React from "react";

import './NavBar.css';

class NavBar extends React.Component {
 
  // onClick gets the menu button when clicked by user
  onClick = (event) => {
    this.props.clickedLink(
      event.target.value
    );
    event.preventDefault();
  };
  
  render() {
    console.log(this.props.className);
    return (
      <nav className={this.props.className} onClick={this.onClick}>{this.props.children}</nav>
    );
  }
}

export default NavBar;
