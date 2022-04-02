import express from "express";
// import socket from "socket.io";
import { startSocket } from "./socketService";
import { Server } from "socket.io";
import { createServer } from "http";
// const app = express();

// const server = app.listen(3001);

const socket = startSocket();

// const socketServer = createServer();

// const io = new Server(socketServer, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });
// socketServer.listen(3100);

// io.on("connection", (socket) => {
//   console.log("Hello socket");
//   socket.on("mouse", (data) => {
//     console.log(data);
//   });
// });

// io.on("mouse", (data) => {
//   console.log(data);
// });

console.log("📡  Socket server started");

console.log("Hello from game server");
