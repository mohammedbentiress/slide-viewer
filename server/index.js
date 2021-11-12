const express = require("express");
const path = require("path");
const DIST_DIR = path.join(__dirname, "../dist");
const HTML_FILE = path.join(DIST_DIR, "index.html");
const app = express();
const port = process.env.PORT || 3000;
const mockResponse = {
  foo: "bar",
  bar: "foo",
};
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(DIST_DIR));
app.get("/api", (req, res) => {
  res.send(mockResponse);
});
app.get(HTML_FILE, (req, res) => {
  res.status(200).send("Hello World!");
});
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on("action", (msg) => {
    console.log("action received", msg);
    socket.broadcast.emit("action", msg);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
server.listen(port, function () {
  console.log("App listening on port: " + port);
});
