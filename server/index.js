const express = require("express");
const app = express();
const watson = require("../helpers/watson");
const bodyParser = require("body-parser");

const port = 8080;

app.use(express.static("../public"));
app.use(bodyParser.json());

app.get("/data", (req, res) => {
  console.log("req received!");
  watson.callWatson().then(data => {
    res.send(data);
  });
});

app.post("/api/blob", (req, res) => {
  console.log(req.body.data);
  console.log(req.body.data);
  res.send(200);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
