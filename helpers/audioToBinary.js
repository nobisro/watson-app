const fs = require("fs");

function audioToBinary() {
  const test = fs.readFileSync(
    "../assets/audio-file.flac",
    "binary",
    (err, data) => {
      if (err) {
        console.log("about to error out");
        console.error(err);
      }
      const encodedAudio = new Buffer(data, "binary").toString("binary");
      const decodedAudio = new Buffer(encodedAudio, "base64").toString(
        "binary"
      );
      return decodedAudio;
    }
  );

  return test;
}

function logHey() {
  console.log("hey hey hey hey");
}

// const attempt = audioToBinary();

// console.log("==== T E S T =====");
// console.log(attempt.length);
// console.log("==== E N D ====");
module.exports = audioToBinary;
