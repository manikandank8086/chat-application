import { Server, Socket } from "socket.io";
import Message from "../models/messageModel";

interface MessagePayload {
  senderId: string;
  receiverId: string;
  text: string;
}

export const socketHandler = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("Connected:", socket.id);

    // user joins own room
    socket.on("join", (userId: string) => {
      socket.join(userId);
    });

    socket.on("sendMessage", async (data: MessagePayload) => {
      // save to DB
      const message = await Message.create(data);

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
