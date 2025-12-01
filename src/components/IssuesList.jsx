import { useEffect, useState } from "react";
import { loadIssues } from "../lib/loadIssues";

export default function IssuesList({ onSelect }) {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    loadIssues().then(setIssues);
  }, []);
  
  return (
    <div className="issuesList">
      {issues.map(issue => (
        <button
          key={issue.id}
          className="issueButton"
          onClick={() => onSelect(issue)}
        >
          {issue.metadata.title}
        </button>
      ))}
    </div>
  );
}

