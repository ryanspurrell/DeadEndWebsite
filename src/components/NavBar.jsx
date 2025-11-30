// NavBar.jsx

import React from "react";

import './NavBar.css';

// Props: className, clickedLink (function), activePage
class NavBar extends React.Component {

  state = {
    activePage: this.props.activePage,
    className: this.props.className,
    children: this.props.children
  };


  // onClick gets the menu button clicked by user
  onClick = (event) => {
    this.props.clickedLink(
      event.target.value
    );
    event.preventDefault();
  };
  
  render() {

    console.log(this.props.activePage);
    console.log(this.props.children);
    return (
      <nav className={this.props.className} onClick={this.onClick}>
        <div className={this.props.activePage}>{this.props.children}</div>
      </nav>
    );
  }
}

export default NavBar;
