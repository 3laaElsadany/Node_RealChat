const express = require("express");
const app = express();
require('dotenv').config();

const server = require("http").createServer(app);

const io = require("socket.io")(server);

app.use(express.static("public"))

io.on("connection", (socket) => {

  socket.on('message', (data) => {
    io.emit('message', data);
  });

  socket.on('broad', (data) => {
    socket.broadcast.emit('newBroad', data);
  });

  socket.on('stop typing', () => {
    socket.broadcast.emit('stop typing');
  });


})

const port = process.env.PORT;
server.listen(port, () => {
  console.log("Server Running")
})