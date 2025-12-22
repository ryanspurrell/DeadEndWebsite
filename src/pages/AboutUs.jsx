// AboutUs.jsx

import { useState, useCallback } from "react";

import EntriesList from "../components/EntriesList";
import NavBar from "../components/NavBar";

import "./AboutUs.css";


export default function AboutUs() {
  
  const [index, setIndex] = useState(0);
  const [member, setMember] = useState(null);
  const [members, setMembers] = useState([]);

  const handleSelect = useCallback((i) => {
    setMember(i);
    setIndex(0);
  },[]);

  // What is shown before member is selected
  const AboutUsEntries = ({ className }) => 
    <EntriesList entriesFolder="../../members" className={className} buttonClass="aboutusButton" onSelect={(i) => {
      setMember(i);
  }}/>;

  document.title = "AboutUs";

  if (!member) {
    return <AboutUsEntries className="notSelected" />;
  }

  return (
    <div className="aboutusDiv">
      <div className="aboutusPage">
     
        <div className="aboutusHeader">
          <h2>{member.metadata.title}</h2>
          <button className="back" onClick={() => setMember(null)}>
            Back
          </button>
        </div>

        <div className="aboutusDispContainer">
          <div className="aboutusDisp"></div>
        </div>

        <div className="aboutusFooter"><p>Test</p></div>

        <NavBar className="aboutusNav">
          <AboutUsEntries />
        </NavBar>
      </div>
    </div>
  );
}
