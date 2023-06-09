const express = require("express");
const cors = require("cors");
const socket = require("socket.io");
const app = express();

app.use(cors());
app.use(express.json());

const server = app.listen(3008, () => {
  console.log("Server running on port 3008...");
});

io = socket(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);

    socket.on("send_message", (data) => {
      console.log(data);
      socket.to(data.room).emit("receive_message", data.content);
    });

    console.log("User joined Room: " + data);
  });

  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED");
  });
});
