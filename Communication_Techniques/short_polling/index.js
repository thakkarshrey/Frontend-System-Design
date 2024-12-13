const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

let data = "Initial data";

app.get("/get-data", (req, res) => {
  res.send({
    data,
  });
});

app.get("/update-data", (req, res) => {
  data = "Updated data";
  res.send({
    data,
  });
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
