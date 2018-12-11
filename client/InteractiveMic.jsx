import React from "react";
import rp from "request-promise";
import request from "request";
import axios from "axios";
import $ from "jquery";

export default class InteractiveMic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "hello"
    };
    this.handleAudioRecord = this.handleAudioRecord.bind(this);
    this.handleExperiment = this.handleExperiment.bind(this);
    this.handleData = this.handleData.bind(this);
  }

  handleAudioRecord() {
    const player = document.getElementById("player");

    const handleSuccess = function(stream) {
      if (window.URL) {
        player.src = window.URL.createObjectURL(stream);
      } else {
        player.src = stream;
      }
    };

    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then(handleSuccess);
  }

  handleData(url) {
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        const fd = new FormData();
        fd.append("upl", blob, "./voice_recording.ogg");

        fetch("/api/blob", {
          method: "post",
          body: fd
        }).then(data => {
          console.log("data:", data);
          this.setState({
            data: data
          });
        });
      });
  }

  handleExperiment(handler) {
    const record = document.querySelector("#record");
    const stop = document.querySelector("#stop");
    const constraints = { audio: true };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(mediaStream => {
        const player = document.getElementById("player");

        const mediaRecorder = new MediaRecorder(mediaStream, {
          mimeType: "audio/webm; codecs=opus"
        });
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

          // const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });

          const blob = new Blob(chunks, { type: "audio/webm" });
          const buffer = new ArrayBuffer(blob);

          chunks = [];

          // let b64 = btoa(blob);
          // let b64Len = b64.length;
          // console.log("blob:", blob);
          const a = document.createElement("a");
          const url = window.URL.createObjectURL(blob);
          console.log("url:", url);

          handler(url);
          // fetch(url)
          //   .then(response => response.blob())
          //   .then(blob => {
          //     const fd = new FormData();
          //     fd.append("upl", blob, "./voice_recording.ogg");

          //     fetch("/api/blob", {
          //       method: "post",
          //       body: fd
          //     }).then(data => {
          //       this.handleData(data);
          //     });
          //   });
          // a.href = url;
          // a.download = "record.webm";
          // a.click();
          // document.body.appendChild(a);

          const formData = new FormData();
          // localStorage.myAudio = buffer;
          formData.append("upl", url);

          // let base64data;
          // var reader = new FileReader();
          // reader.readAsDataURL(blob);
          // reader.onloadend = function() {
          //   base64data = reader.result;
          //   // console.log("base64data:", base64data);
          // };

          // const options = {
          //   method: "post",
          //   url: "http://localhost:8080/api/blob",
          //   data: { blob: fd },
          //   responseType: "blob"
          // };

          // axios(options).then(() => {
          //   console.log("posted");
          // });

          //
          // fetch("/api/blob", {
          //   method: "post",
          //   body: formData
          // });

          // console.log("b64:", b64);
          // console.log("len:", b64.length);

          //   const fd = new FormData();
          //   fd.append("audio", blob);
          //   fd.set("audio", blob);

          //   const options = {
          //     method: "post",
          //     url: "http://localhost:8080/api/blog",
          //     data: fd,
          //     config: {
          //       headers: {
          //         "Content-Type": "multipart/form-data",
          //         Accept: "application/json"
          //       },
          //       contentType: "multipart/form-data"
          //     }
          //   };

          // const options = {
          //   method: "post",
          //   url: "http://localhost:8080/api/blob",
          //   data: { blob: base64data, length: base64data.length },
          //   responseType: "blob"
          // };

          //   .then(() => {
          //     console.log("success");
          //   })
          //   .catch(err => {
          //     console.log("there was an error");
          //   });

          // axios(options).then(() => {
          //   console.log("posted");
          // });

          //   $.ajax({
          //     type: "POST",
          //     url: "http://localhost:8080/api/blob",
          //     data: fd,
          //     dataType: "audio/ogg; codecs=opus",
          //     contentType: "multipart/form-data",
          //     processData: false
          //   });

          //request.post("http://localhost:8080/api/blog", fd);

          //   rp(options).then(() => {
          //     console.log("sent");
          //   });
          //   axios.post("/api/blob", { data: blob }).then(success => {
          //     console.log("===== success =====");
          //   });

          const audioURL = window.URL.createObjectURL(blob);
          console.log("blob.type:", blob.type);
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
        <button
          onClick={() => {
            this.handleExperiment(this.handleData);
          }}
        >
          experiment
        </button>
        <button id="record">record</button> <button id="stop">stop</button>
        <p>{this.state.data}</p>
      </React.Fragment>
    );
  }
}

//<button onClick={this.handleAudioRecord}>start</button>
//<audio id="player" controls />
