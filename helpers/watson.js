const SpeechToTextV1 = require("watson-developer-cloud/speech-to-text/v1");
const API = require("../API.js");
const fs = require("fs");

function asyncWatson() {
  var speechToText = new SpeechToTextV1({
    iam_apikey: API.KEY,
    url: API.URL
  });

  const params = {
    audio: fs.createReadStream("../assets/audio-file.flac")
  };

  return new Promise((resolve, reject) => {
    speechToText.recognize(params, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res["results"][0]["alternatives"][0]["transcript"]);
      }
    });
  });
}

// asyncWatson.then(promise => {});

// async function resolveWatson() {
//   const transcript = await asyncWatson();
//   console.log("transcript: ", transcript);
//   return transcript;
// }

// resolveWatson();

module.exports.callWatson = asyncWatson;
