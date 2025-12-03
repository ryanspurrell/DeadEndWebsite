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
import Footer from './components/Footer';

const getNavLinkClassName = (navLinkClass) => ({ isActive }) =>
  isActive ? `${navLinkClass} active` : navLinkClass;

// Define the buttons in the navigation bar
const LogoButton = ({navLinkClass, childClass}) => 
  <NavLink to="/" className={getNavLinkClassName(navLinkClass)} end>
    <Logo className={childClass} value="/" />
  </NavLink>;

const IssuesButton = ({navLinkClass, childClass}) => 
  <NavLink to="/issues" className={getNavLinkClassName(navLinkClass)}>
    <button className={childClass} value="/issues">Issues</button>
  </NavLink>;

const AboutUsButton = ({navLinkClass, childClass}) => 
  <NavLink to="/aboutus" className={getNavLinkClassName(navLinkClass)}>
    <button className={childClass} value="/aboutus">About Us</button>
  </NavLink>;

const ContactButton = ({navLinkClass, childClass}) => 
  <NavLink to="/contact" className={getNavLinkClassName(navLinkClass)}>
    <button className={childClass} value="/contact">Contact</button>
  </NavLink>;

function RouterContent() {
  const location = useLocation();
  
  let currentPage = "";
  const pathSegment = location.pathname.split('/')[1]; 
  
  if (pathSegment === "" || pathSegment === undefined) {
    currentPage = "home";
  } else if (["issues", "aboutus", "contact"].includes(pathSegment)) {
    currentPage = pathSegment;
  }
  
  return (
    <div className={currentPage}> 
      
      <div className="navContainer">
        <NavBar className="navBar"> 
          <LogoButton navLinkClass="logoNavLink" childClass="logoButton"/>
          <IssuesButton navLinkClass="issuesNavLink" childClass="issuesButton" />
          <AboutUsButton navLinkClass="aboutusNavLink" childClass="aboutusButton" />
          <ContactButton navLinkClass="contactNavLink" childClass="contactButton" />
        </NavBar>
      </div>
      
      <div className="mainContainer">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/issues/*" element={<Issues />}/>
          <Route path="/aboutus" element={<AboutUs />}/>
          <Route path="/contact" element={<Contact />}/>
        </Routes>
      </div>
        
    </div>
  );
}

function App() {

  return (
    
    <div className="pageContainer">
     
      <Router future={{v7_start_transition: true,}}>
        <RouterContent />
      </Router>
      
      <div className="footer">
        <Footer audioDir="/songs/loop/" />
      </div>

    </div>
  );
}

export default App;
