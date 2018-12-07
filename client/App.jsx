import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    axios.post(
      "https://gateway-wdc.watsonplatform.net/speech-to-text/api/v1/recognize"
    );
  }

  render() {
    return (
      <React.Fragment>
        <div />
      </React.Fragment>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById("root"));
