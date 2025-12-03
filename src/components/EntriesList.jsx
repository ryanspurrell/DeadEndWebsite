// EntriesList.jsx

import React, { useEffect, useState } from "react";
import { Route, Link } from "react-router-dom";
import { loadEntries } from "../lib/loadEntries";

const EntriesList = React.memo((props) => {

  const onSelect = props.onSelect;
  const entryFolder = props.entriesFolder;
  const className = props.className;
  const buttonClass = props.buttonClass;

  const [entries, setEntries] = useState([]);

  useEffect(() => {
    loadEntries(entryFolder).then(entries => {
      
      const sortedEntries = entries.sort((a, b) => {
        
        const dateDataA = a.metadata?.other?.["date-published"];
        const dateDataB = b.metadata?.other?.["date-published"];
        
        const parseDate = (dateData) => {
          if (!dateData || !dateData.year || !dateData.month || !dateData.day) {
            return null;
          }
          return new Date(dateData.year, dateData.month - 1, dateData.day);
        };
        
        const dateA = parseDate(dateDataA);
        const dateB = parseDate(dateDataB);
        
        if (!dateA && !dateB) return 0;         
        if (!dateA) return 1; 
        if (!dateB) return -1; 
        
        return dateB.getTime() - dateA.getTime(); 
      });

      setEntries(sortedEntries);
      
      if (sortedEntries.length > 0 && props.onSelect) {
        props.onSelect(sortedEntries[0]);
      }
    });
  }, [entryFolder], onSelect);

  return (
    <div className={className}>
      {props.children}
      {entries.map(entry => (
          <button
            key={entry.id}
            className={buttonClass || "entryButton"}
            onClick={() => onSelect(entry)}
          >
            {entry.metadata.title}
          </button>
      ))}
    </div>
  );
});

export default EntriesList;

