const express = require("express");
const app = express();

app.get("/", (request, response) => {
  response.send({ message: "Succefully got the data" });
});

app.listen(8000, () => {
  console.log(`Server is listening on port 8000`);
});
