// App.jsx

import './App.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";

import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Issues from './pages/Issues';
import Contact from './pages/Contact';

import NavBar from './components/NavBar';
import Logo from './components/Logo';
import Footer from './components/Footer';

// Define the buttons in the navigation bar
// doing them here and not NavBar.jsx because of routing
const LogoButton = ({navLinkClass, childClass}) => 
  <Link to="/" className={navLinkClass}><Logo className={childClass} value="/" /></Link>;
const IssuesButton = ({navLinkClass, childClass}) => 
  <Link to="/issues" className={navLinkClass}><button className={childClass} value="/issues">Issues</button></Link>;
const AboutUsButton = ({navLinkClass, childClass}) => 
  <Link to="/aboutus" className={navLinkClass}><button className={childClass} value="/aboutus">About Us</button></Link>;
const ContactButton = ({navLinkClass, childClass}) => 
  <Link to="/contact" className={navLinkClass}><button className={childClass} value="/contact">Contact</button></Link>

class App extends React.Component {

  // Default link is to home
  state = {
    pageLink: "/",
    currentPage: this.getPage()
  };

  // Get the clicked link from the NavBar
  //  i.e pass NavBar data to parent App
  handleNavBarClick = (clickedLink) => {
    if (clickedLink) {
      this.setState({ pageLink: clickedLink });
    } else {
      this.setState({ pageLink: "/" });
    };
    this.setState({ currentPage: this.getPage() });
  };

  getPage() {
    const currentURL = window.location.href;
    const pageList = currentURL.split("/");
    const page = pageList[pageList.length - 1];

    if ( page === "" ) {
      return "home";
    } else {
      return page;
    }
  }

  render() {
    
    const { pageLink } = this.state;
    const { currentPage } = this.state;
 
    return (
      <div className="pageContainer">
        <div className={currentPage}>
          <Router>
          
            <div className="navContainer">
              <NavBar className="navBar" clickedLink={this.handleNavBarClick} activePage={currentPage}>
                <LogoButton navLinkClass="logoNavLink" childClass="logoButton"/>
                <IssuesButton navLinkClass="issuesNavLink" childClass="issuesButton" />
                <AboutUsButton navLinkClass="aboutusNavLink" childClass="aboutusButton" />
                <ContactButton navLinkClass="contactNavLink" childClass="contactButton" />
              </NavBar>
            </div>
          
            <div className="mainContainer">
              <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/issues" element={<Issues />}/>
                <Route path="/aboutus" element={<AboutUs />}/>
                <Route path="/contact" element={<Contact />}/>
              </Routes>
            </div>

          </Router>
        </div>
        <Footer audioDir="/songs/loop/" />
      </div>
    );

  }
}

export default App;
