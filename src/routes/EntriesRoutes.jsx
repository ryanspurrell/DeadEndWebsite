// EntriesRoutes.jsx

import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { loadEntries } from "../lib/loadEntries";

export default function EntriesRoutes(props) {
  
  const entryFolder = props.entriesFolder;

  const [entries, setEntries] = useState([]);

  useEffect(() => {
    loadEntries(entryFolder).then(setEntries);
  },[]);

  return (
    <Routes>
      {entries.map(entry => (
        <Route key={entry.id+"Route"} path={entry.id} />
      ))}
    </Routes>
  );
}
