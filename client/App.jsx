import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transcript: ""
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
          Click to send audio to Watson!
        </button>
        <div>{transcript}</div>
      </React.Fragment>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById("root"));
