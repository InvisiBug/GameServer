import { createServer } from "http";
import { Server } from "socket.io";

export const startSocket = () => {
  const socketServer = createServer();

  const io = new Server(socketServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  socketServer.listen(3100);

  io.on("connection", (socket) => {
    console.log("User connected with id", socket.id);

    socket.on("mouse", (data) => {
      socket.broadcast.emit("mouse", data);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  console.log("📡  Socket server started");

  return io;
};
