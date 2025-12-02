// EntriesList.jsx

import { useEffect, useState } from "react";
import { loadEntries } from "../lib/loadEntries";

export default function EntriesList(props) {

  const onSelect = props.onSelect;
  const entryFolder = props.entriesFolder;
  const className = props.className;
  const buttonClass = props.buttonClass;

  const [entries, setEntries] = useState([]);

  useEffect(() => {
    loadEntries(entryFolder).then(setEntries);
  }, []);
  
  return (
    <div className={className}>
      {entries.map(entry => (
        <button
          key={entry.id}
          className="entryButton"
          onClick={() => onSelect(entry)}
        >
          {entry.metadata.title}
        </button>
      ))}
    </div>
  );
}

