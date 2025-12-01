// Footer.jsx
//
// This is the div at the bottom of the screen (i.e the footer) and will play audio
// and open the audio menu / display social media links and whatnot

import React, { useState, useEffect } from 'react';

import "./Footer.css";

export default function Footer(props) {
  
  const audioDir = props.audioDir;
  const className = props.className;
  const meta = props.audioDir + "metadata.json";

  let [audioJSON, setAudioJSON] = useState(null);

  useEffect(() => {
    fetch(meta)
      .then(x => x.json())
      .then(y => setAudioJSON(y))
  },[]);
 
  return (
    <div className="footer1">
      <div className="songInfo">
      </div>
        
      <div className="audioPlayer">
        {audioJSON && <audio controls><source src=
          {audioDir + audioJSON.title + audioJSON.filetype} 
        type=
          {"audio/" + audioJSON.filetype.split(".")[1]}/></audio>}
      </div>
    </div>
  );
}
