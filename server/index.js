const express = require("express");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ dest: __dirname + "/uploads/" });
const type = upload.single("upl");
const app = express();
const watson = require("../helpers/watson");
const bodyParser = require("body-parser");
const convertToOgg = require("../helpers/convertToOgg");
const handleAudioSuccess = require("../helpers/handleAudioSuccess");

const port = 8080;

app.use(express.static("../public"));
app.use(bodyParser.json());
// app.use(
//   bodyParser.urlencoded({
//     extended: true
//   })
// );

app.get("/data", (req, res) => {
  console.log("req received!");
  watson.callWatson().then(data => {
    res.send(data);
  });
});

app.post("/api/blob", type, (req, res) => {
  console.log("post req hit!");
  console.log("file", req.body.upl);
  console.log("req.file:", req.file.path);
  // convertToOgg(req.file).then(data => {
  //   console.log("data:", data);
  // });

  watson
    .callWatson(req.file.path)
    .then(data => {
      console.log(data);
      return new Promise((resolve, reject) => {
        resolve(data);
      });
    })
    .then(success => {
      console.log("success:", success);
      res.send(success);
    });
  // .then(data => {
  //   console.log("data in server:", data);
  //   console.log("type of data:", typeof data);
  //   return data;
  //   // res.set({ "Content-Type": "text/plain" });
  //   // res.type("application/json");
  // })
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
