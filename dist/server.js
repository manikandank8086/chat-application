"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db_1 = __importDefault(require("./config/db"));
const app_1 = __importDefault(require("./app"));
// Connect to DB
(0, db_1.default)();
const PORT = parseInt(process.env.PORT || "5000", 10);
const server = http_1.default.createServer(app_1.default);
// Socket.IO setup
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:5173", // frontend URL
        methods: ["GET", "POST"],
    },
});
// Socket.IO connection handler
io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);
    socket.on("message", (data) => {
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
