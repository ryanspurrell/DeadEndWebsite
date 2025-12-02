// Entries.jsx

import { useState } from "react";

import EntriesList from "../components/EntriesList";
import NavBar from "../components/NavBar";

// Props: entriesFolder: can be songs, issues, members, etc
export default function Entries(props) {

  const entriesFolder = props.entriesFolder;
  const entriesClass = props.className;
  const buttonClass = props.buttonClass;

  const [selectedEntry, setSelectedEntry] = useState(null);
  const [entryIndex, setEntryIndex] = useState(0);
  
  if (!selectedEntry) {
    return <EntriesList entriesFolder={entriesFolder} className={entriesClass} buttonClass={buttonClass}
            onSelect={(i) => {
            setSelectedEntry(i);
            setEntryIndex(0)
            }} />;
  }

  const pages = selectedEntry;
  const pageSrc = pages[entryIndex];

  function nextPage() {
    setEntryIndex((i) => (i + 1) % pages.length);
  }

  function prevPage() {
    setEntryIndex((i) => (i - 1 + pages.length) % pages.length);
  }

  const EntryData = 
        <div className="entryData">
          <h2>{selectedEntry.metadata.title}</h2>
          <button className="back" onClick={() => setSelectedEntry(null)}>
            Back
          </button>
        </div>;


  return (
      <div className="entryViewer">
        
        <div className="entryDispContainer">
          <img className="entryDisp" src={pageSrc} />
        </div>

        <div className="entryFooter">
          <div className="larrow">
            <button className="left" onClick={prevPage}>&#10094;</button>
          </div>;
          <p className="pageNum">
            Page {entryIndex + 1} / {pages.length}
          </p>
          <div className="rarrow">
            <button className="rarrow" onClick={nextPage}>&#10095;</button>
          </div>
        </div>

        <NavBar className="entriesNav">
          <EntriesList entriesFolder={entriesFolder} className={entriesClass} buttonClass={buttonClass} onSelect = {(i) => {
            setSelectedEntry(i);
            setEntryIndex(0);
          }} />
        </NavBar>

      </div>
  );
}
