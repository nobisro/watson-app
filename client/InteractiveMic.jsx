import React from "react";
import axios from "axios";

export default class InteractiveMic extends React.Component {
  constructor(props) {
    super(props);
    this.handleAudioRecord = this.handleAudioRecord.bind(this);
    this.handleExperiment = this.handleExperiment.bind(this);
  }

  handleExperiment() {
    const record = document.querySelector("#record");
    const stop = document.querySelector("#stop");
    const soundClips = document.querySelector("#sound-clips");
    const constraints = { audio: true };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(mediaStream => {
        const player = document.getElementById("player");

        const mediaRecorder = new MediaRecorder(mediaStream);
        console.log(mediaRecorder);

        // On click begins recording and changes button styling to red
        record.onclick = () => {
          mediaRecorder.start();
          console.log(mediaRecorder.state);
          console.log("recorder started");
          record.style.background = "red";
          record.style.color = "black";
        };

        // Register event handler and collect the audio data into chunks array
        let chunks = [];
        mediaRecorder.ondataavailable = function(e) {
          chunks.push(e.data);
        };

        stop.onclick = () => {
          mediaRecorder.stop();
          console.log(mediaRecorder.state);
          console.log("recorder stopped");
        };

        mediaRecorder.onstop = function(e) {
          console.log("recorder stopped");

          const audio = document.createElement("audio");
          const deleteButton = document.createElement("button");

          audio.setAttribute("controls", "au");
          deleteButton.innerHTML = "Delete";

          const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
          chunks = [];

          axios.post("/data", { data: blob }).then(success => {
            console.log("===== success =====");
          });

          const audioURL = window.URL.createObjectURL(blob);
          console.log(blob.type);
          audio.src = audioURL;

          deleteButton.onclick = function(e) {
            var evtTgt = e.target;
            evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
          };
        };
      })
      .catch(err => {
        console.log("error:", err);
      });
  }

  render() {
    return (
      <React.Fragment>
        <button onClick={this.handleExperiment}>experiment</button>
      </React.Fragment>
    );
  }
}

//<button onClick={this.handleAudioRecord}>start</button>
