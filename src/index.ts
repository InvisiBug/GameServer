import express from "express";
// import socket from "socket.io";
import { startSocket } from "./socketService";
import { Server } from "socket.io";
import { createServer } from "http";
import { Blob } from "./blob";
// const app = express();

// const server = app.listen(3001);

// const socket = startSocket();

const socketServer = createServer();

const connectedBlobs: Array<Blob> = [];

const io = new Server(socketServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
socketServer.listen(3100);

io.on("connection", (socket) => {
  console.log(`User ${socket.id.substring(0, 3)} connected`);

  socket.on("start", (data) => {
    const { pos, r } = data;
    console.log(socket.id, pos.x, pos.y, r);
    connectedBlobs.push(new Blob(socket.id, data.pos, data.r));
    socket.emit("id", socket.id);
  });

  socket.on("update", (data) => {
    let blob: Blob | undefined;

    for (let i = 0; i < connectedBlobs.length; i++) {
      if (socket.id == connectedBlobs[i].id) {
        blob = connectedBlobs[i];
      }
    }

    //! Removes stupid typescript error
    if (!blob) {
      return;
    }

    blob.pos = data.pos;
    blob.r = data.r;

    // socket.broadcast.emit("heartbeat", connectedBlobs);
  });

  socket.on("disconnect", () => {
    console.log(`User ${socket.id.substring(0, 3)} disconnected`);
    for (let i = 0; i < connectedBlobs.length; i++) {
      if (socket.id == connectedBlobs[i].id) {
        connectedBlobs.splice(i, 1);
      }
    }
  });
});

setInterval(() => {
  io.sockets.emit("heartbeat", connectedBlobs);
}, 16);

console.log("📡  Socket server started");

console.log("Hello from game server");
