const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname)); // always add this line to allow using static files like css files

io.on("connection", (socket) => {
  console.log("Socket connected!!");
  socket.on("CHAT_MESSAGE", (message) => {
    io.emit("CHAT_MESSAGE", message);
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const PORT = 8080;

server.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
