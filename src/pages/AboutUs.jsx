// AboutUs.jsx

import { useState, useCallback, useEffect } from "react";
import { loadEntries } from "../lib/loadEntries";

import EntriesList from "../components/EntriesList";
import NavBar from "../components/NavBar";

import "./AboutUs.css";

export default function AboutUs() {
  
  const [index, setIndex] = useState(0);
  const [member, setMember] = useState(null);
  const [bio, setBio] = useState([]);
  const [img, setImg] = useState(null);
  const [members, setMembers] = useState([]);

  const handleSelect = useCallback((i) => {
    setMember(i);
    setIndex(0);
  },[]);

  const AboutUsEntries = ({ className }) => 
    <EntriesList entriesFolder="../../members" className={className} buttonClass="aboutusButton" onSelect={(i) => {
      setMember(i);
  }}/>;
  
  const bioFile = member
    ? `/members/${member.id}/${member.metadata.entries}`
    : null;

  const imgFile = member
    ? `/members/${member.id}/${member.metadata.images}`
    : null;

  useEffect(() => {
    if (!bioFile) return;
    fetch(bioFile)
      .then((res) => {
        if (!res.ok) {
          throw new Error("failed to load bio");
        }
        return res.text();
    })
      .then((text) => {
        setBio(text);
      })
      .catch((err) => {
        console.error(err);
        setBio("failed to load bio");
      });
  },[bioFile, member]);

  document.title = "AboutUs";

  if (!member) {
    return <AboutUsEntries className="notSelected" />
  }


  
  return (
    <div className="aboutusDiv">
      <div className="aboutusPage">
     
        <div className="aboutusHeader">
          <h2 className="member">{member.metadata.title}</h2>
        </div>

        <div className="aboutusDispContainer">
          <div className="aboutusDisp">
            <img className="img" src={imgFile} />
            <p className="bio">{bio}</p>
          </div>
        </div>

        <div className="aboutusFooter"></div>

        <NavBar className="aboutusNav">
          <AboutUsEntries />
        </NavBar>
      </div>
    </div>
  );
}
