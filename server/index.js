const express = require("express");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ dest: __dirname + "/uploads/" });
const type = upload.single("upl");
const app = express();
const watson = require("../helpers/watson");
const bodyParser = require("body-parser");
const convertToOgg = require("../helpers/convertToOgg");

const port = 8080;

app.use(express.static("../public"));
// app.use(bodyParser.json());
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
  console.log("req.body", req.body);
  console.log("req.file:", req.file);
  convertToOgg(req.file);

  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
