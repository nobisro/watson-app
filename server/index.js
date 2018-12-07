const express = require("express");
const app = express();
const watson = require("../helpers/watson");

const port = 8080;

app.use(express.static("../public"));

app.get("/data", (req, res) => {
  console.log("req received!");
  watson.callWatson().then(data => {
    res.send(data);
  });
});

app.post("/data", (req, res) => {
  console.log(req.body);
  res.send(200);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
