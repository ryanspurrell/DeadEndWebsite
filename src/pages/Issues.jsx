// Issues.jsx

import { useState } from "react";

import EntriesList from "../components/EntriesList";
import NavBar from "../components/NavBar";

import './Issues.css';

export default function Issues() {

  const [issue, setIssue] = useState(null);
  const [index, setIndex] = useState(0);

  const IssuesEntries = ({ className }) => 
    <EntriesList entriesFolder="../../issues" className={className} buttonClass="issuesButton" onSelect={(i) => {
      setIssue(i);
      setIndex(0);
    }} />;

  document.title = "Issues";

  if (!issue) {
    return <IssuesEntries className="notSelected" />;
  }

  const pages = issue.pages;
  const pageSrc = pages[index];

  function nextPage() {
    setIndex((i) => (i + 1) % pages.length);
  }

  function prevPage() {
    setIndex((i) => (i - 1 + pages.length) % pages.length);
  }
  
  return (
    <div className="issuesDiv">
      <div className="issuesPage">
     

        <div className="issuesDispContainer">

          <div className="issuesDispWrapper">
            

            <button className="dispButton left" onClick={prevPage}>&#10094;</button>
            <img className="issuesDisp" src={pageSrc} />
            <button className="dispButton right" onClick={nextPage}>&#10095;</button>
            
            <div className="issuesFooter">
              <p className="pageNum">Page {index + 1} / {pages.length}</p>
            </div>
          
          </div>
        </div>


        <NavBar className="issuesNav">
          <IssuesEntries />
        </NavBar>
      </div>
    </div>
  );
}
