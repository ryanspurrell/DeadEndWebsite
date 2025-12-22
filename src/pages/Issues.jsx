// Issues.jsx

import { useState, useCallback, useEffect } from "react";
import { loadEntries } from "../lib/loadEntries";

import EntriesList from "../components/EntriesList";
import NavBar from "../components/NavBar";

import './Issues.css';

function sortDates(entries) {
  
  const sorted = entries.sort((a, b) => {
    const dateDataA = a.metadata?.other?.["date-published"];
    const dateDataB = b.metadata?.other?.["date-published"];

    const parseDate = (dateData) => {
      if (!dateData || !dateData.year || !dateData.month || !dateData.day) return null;
      return new Date(dateData.year, dateData.month - 1, dateData.day);
    };

    const dateA = parseDate(dateDataA);
    const dateB = parseDate(dateDataB);

    if (!dateA && !dateB) return 0;
    if (!dateA) return 1;
    if (!dateB) return -1;

    return dateB.getTime() - dateA.getTime();
  });
  return sorted;
}

export default function Issues() {

  const [issue, setIssue] = useState(null);
  const [issues, setIssues] = useState([]);
  const [index, setIndex] = useState(0);

  // This code loads all issues, then shows the most recent issue based on the dates
  // code is only loaded when the issues page is loaded
  useEffect(() => {
    loadEntries("/issues").then(entries => {
      const sorted = sortDates(entries);
      setIssues(sorted);
      setIssue(sorted[0]);
    });
  },[]);

  const handleSelect = useCallback((i) => {
    setIssue(i);
    setIndex(0);
  }, []);

  const IssuesEntries = ({ className }) => 
    <EntriesList 
      entriesFolder="/issues" 
      className={className} 
      buttonClass="issuesButton" 
      onSelect={handleSelect} />;

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
            

            <div className="dispButtonContainer">
            
              <button className="dispButton left" onClick={prevPage}><p>&#10094;</p></button>
              <button className="dispButton right" onClick={nextPage}><p>&#10095;</p></button>
            
            </div>
            <img className="issuesDisp" src={pageSrc} />
            
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
