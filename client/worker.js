onmessage = function(e) {
  fetch(e.data)
    .then(response => response.blob())
    .then(blob => {
      const fd = new FormData();
      fd.append("upl", blob, "./voice_recording.ogg");

      fetch("/api/blob", {
        method: "post",
        body: fd
      })
        .then(response => {
          console.log("response:", response);
          return response.body;
        })
        .then(body => {
          const reader = body.getReader();
          return reader.read();
        })
        .then(({ done, value }) => {
          if (done) {
            console.log("done:", done);
          } else {
            let str = new TextDecoder("utf-8").decode(value);
            // this.setState({
            //   data: str
            // });
            console.log(str);
            postMessage(str);
          }
        });
    });
};
