"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketHandler = void 0;
const messageModel_1 = __importDefault(require("../models/messageModel"));
const socketHandler = (io) => {
    io.on("connection", (socket) => {
        console.log("Connected:", socket.id);
        // user joins own room
        socket.on("join", (userId) => {
            socket.join(userId);
        });
        socket.on("sendMessage", async (data) => {
            // save to DB
            const message = await messageModel_1.default.create(data);
            // send only to receiver
            io.to(data.receiverId).emit("receiveMessage", message);
            // (optional) send back to sender
            io.to(data.senderId).emit("receiveMessage", message);
        });
        socket.on("disconnect", () => {
            console.log("Disconnected:", socket.id);
        });
    });
};
exports.socketHandler = socketHandler;
