const SpeechToTextV1 = require("watson-developer-cloud/speech-to-text/v1");
const API = require("../API.js");
const fs = require("fs");

function asyncWatson(path) {
  var speechToText = new SpeechToTextV1({
    iam_apikey: API.KEY,
    url: API.URL
  });
  let audioPath;
  if (path === undefined) {
    audioPath = `${__dirname}/../assets/audio-file.flac`;
  } else {
    audioPath = path;
  }
  // const buff = Buffer.from(path);
  // const audioData = fs.readFileSync(buff);
  //fs.createReadStream(`${path}`)
  let params = {
    audio: fs.createReadStream(`${audioPath}`),
    content_type: "audio/webm"
  };

  return new Promise((resolve, reject) => {
    speechToText.recognize(params, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res["results"][0]["alternatives"][0]["transcript"]);
        // resolve(res);
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
