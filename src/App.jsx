// App.jsx

import './App.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from "react-router-dom";

import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Issues from './pages/Issues';
import Contact from './pages/Contact';

import NavBar from './components/NavBar';
import Logo from './components/Logo';

class App extends React.Component {

  // Default link is to home
  state = {
    pageLink: "/"
  };

  // Get the clicked link from the NavBar
  //  i.e pass NavBar data to parent App
  handleNavBarClick = (clickedLink) => {
    if (clickedLink) {
      this.setState({ pageLink: clickedLink });
    } else {
      this.setState({ pageLink: "/" });
    };
  };

  render() {

    const { pageLink } = this.state;
    const activePage = pageLink;

    return (
      <div className="pageContainer">
      <Router>

        <NavBar className="navBar" clickedLink={this.handleNavBarClick} activePage={activePage}>
          <NavLink to="/">
            <Logo value="/" />
          </NavLink>

          <NavLink to="/issues">
            <button value="/issues">Issues</button>
          </NavLink>

          <NavLink to="/aboutus">
            <button value="/aboutus">About Us</button>
          </NavLink>
          
          <NavLink to="/contact">
            <button value="/contact">Contact</button>
          </NavLink>
        </NavBar>

        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/issues" element={<Issues />}/>
          <Route path="/aboutus" element={<AboutUs />}/>
          <Route path="/contact" element={<Contact />}/>
        </Routes>

      </Router>
      <audio controls>
        <source src="./songs/loop/loop.flac" type="audio/flac" />
      </audio>
      </div>
    );

  }
}

export default App;
