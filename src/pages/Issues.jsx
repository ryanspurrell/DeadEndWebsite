// Issues.jsx

import { useState, useCallback } from "react";

import EntriesList from "../components/EntriesList";
import EntriesRoutes from "../routes/EntriesRoutes"

import './Issues.css';

export default function Issues() {

  const [issue, setIssue] = useState(null);
  const [index, setIndex] = useState(0);

  const handleSelect = useCallback((i) => {
    setIssue(i);
    setIndex(0);
  },[]);

  const IssuesEntries = ({ className, children }) => 
    <EntriesList 
      entriesFolder="/issues" 
      className={className}
      children={children}
      buttonClass="issuesButton" 
      onSelect={handleSelect} />;

  const IssuesRoutes = () =>
    <EntriesRoutes entriesFolder="/issues"/>;

  const IssuesNotSelected = () =>
    <IssuesEntries className="notSelected" />;

  
  document.title = "Issues";

  if (!issue) {
    return <IssuesNotSelected />
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


        <div className="issuesNav">
          <IssuesEntries />
        </div>
      </div>
    </div>
  );
}
