// Issues.jsx

import { useState } from "react";

import IssuesList from "../components/IssuesList";
import './Issues.css';
import NavBar from "../components/NavBar";

export default function Issues() {

  const [selectedIssue, setSelectedIssue] = useState(null);
  const [pageIndex, setPageIndex] = useState(0);

  if (!selectedIssue) {
    return <IssuesList onSelect={(i) => {
        setSelectedIssue(i);
        setPageIndex(0)
    }} />;
  }

  const pages = selectedIssue.pages;
  const pageSrc = pages[pageIndex];

  function nextPage() {
    setPageIndex((i) => (i + 1) % pages.length);
  }

  function prevPage() {
    setPageIndex((i) => (i - 1 + pages.length) % pages.length);
  }

  document.title = "Issues";

  const issueData = 
        <div className="issueData">
          <h2>{selectedIssue.metadata.title}</h2>
          <button className="back" onClick={() => setSelectedIssue(null)}>
            Back to Issues
          </button>
        </div>;

  return (
      <div className="issueViewer">
        
        <div className="issueContainer">
          <img className="issueDisplay" src={pageSrc} alt="Issue page" />
        </div>

        <div className="issuesFooter">
          <div className="larrow">
            <button className="left" onClick={prevPage}>&#10094;</button>
          </div>;
          <p className="pageNum">
            Page {pageIndex + 1} / {pages.length}
          </p>
          <div className="rarrow">
            <button className="rarrow" onClick={nextPage}>&#10095;</button>
          </div>
        </div>

        <NavBar className="issuesNav">
          <IssuesList className="issuesList" onSelect = {(i) => {
            setSelectedIssue(i);
            setPageIndex(0);
          }} />
        </NavBar>

      </div>
  );
}
