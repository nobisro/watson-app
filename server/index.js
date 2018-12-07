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

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
