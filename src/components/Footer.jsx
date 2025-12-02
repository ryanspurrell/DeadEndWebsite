// Footer.jsx
//
// This is the div at the bottom of the screen (i.e the footer) and will play audio
// and open the audio menu / display social media links and whatnot

import React, { useState, useEffect } from 'react';

import "./Footer.css";

const songsDir = "/songs";

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


  var audioFiletype = "audio/flac";

  if (audioJSON) {
    audioFiletype = "audio/" + audioJSON.entries[0].split("/")[1].split(".")[1];
  }

  return (
    <div className="footer1">
      <div className="songInfo">
      </div>
        
      <div className="audioPlayer">
        {audioJSON && <audio controls><source src=
          {audioDir + audioJSON.entries[0]} 
        type=
          {audioFiletype}/></audio>}
      </div>
    </div>
  );
}
