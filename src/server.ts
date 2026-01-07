import http from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db";

import app from "./app";



// Connect to DB
connectDB();

const PORT: number = parseInt(process.env.PORT || "5000", 10);
const server = http.createServer(app);

// Socket.IO setup
const io = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:5173", // frontend URL
    methods: ["GET", "POST"],
  },
});

// Socket.IO connection handler
io.on("connection", (socket: Socket) => {
  console.log(`New client connected: ${socket.id}`);

  socket.on("message", (data: string) => {
    console.log("Message received:", data);

    // Broadcast to all clients except sender
    socket.broadcast.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
