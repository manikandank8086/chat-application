"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChats = exports.getMessages = void 0;
const messages_1 = require("../usecase/message/messages");
const getMessages = async (req, res) => {
    try {
        const { userId } = req.params;
        const messages = await (0, messages_1.getMessage)(userId);
        res.status(200).json(messages);
    }
    catch (error) {
        res.status(500).json({
            message: error.message || "Failed to fetch messages",
        });
    }
};
exports.getMessages = getMessages;
const getChats = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const userId = req.user.id;
    const chats = await (0, messages_1.getChatsUseCase)(userId);
    res.status(200).json(chats);
};
exports.getChats = getChats;
