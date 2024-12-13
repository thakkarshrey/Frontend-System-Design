const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

let data = "Initial data";
let waitingListArr = [];

app.get("/get-data", (req, res) => {
  if (data !== req.query.lastData) {
    res.send({ data });
  } else {
    waitingListArr.push(res);
  }
});

app.get("/update-data", (req, res) => {
  data = req.query.data;

  while (waitingListArr.length > 0) {
    const res = waitingListArr.pop();
    res.send({ data });
  }

  res.send({ success: "Data successfully updated!" });
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
