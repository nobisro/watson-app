import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Microphone from "./Microphone.jsx";
// import handleAudioSuccess from "../helpers/handleAudioSuccess";
import InteractiveMic from "./InteractiveMic.jsx";
import Topic from "./Topic.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transcript: "",
      blob: undefined
    };

    this.convertAudioFile = this.convertAudioFile.bind(this);
  }

  convertAudioFile() {
    axios.get("/data").then(data => {
      this.setState({
        transcript: data.data
      });
    });
  }

  render() {
    const transcript = <p>{this.state.transcript}</p>;
    return (
      <React.Fragment>
        <button onClick={this.convertAudioFile}>
          Click to send audio to Watson!!
        </button>
        <div>{transcript}</div>

        <section className="mw7 center">
          <h2 className="athelas ph3 ph0-l">Speaking Practice</h2>
          <Topic />
        </section>
      </React.Fragment>
    );
  }
}

//  <InteractiveMic sendBlob={this.sendBlob} />

export default App;

ReactDOM.render(<App />, document.getElementById("root"));
