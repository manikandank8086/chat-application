"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChatsUseCase = exports.getMessage = void 0;
const userModel_1 = require("../../models/userModel");
const mesageRepository_1 = require("../../repositories/mesageRepository");
const getMessage = async (userId) => {
    if (!userId) {
        throw new Error("UserId is required");
    }
    const messages = await (0, mesageRepository_1.findMessagesByUserId)(userId);
    return messages;
};
exports.getMessage = getMessage;
const getChatsUseCase = async (userId) => {
    const chats = await (0, mesageRepository_1.getLastMessagesByUser)(userId);
    const users = await userModel_1.UserModel.find({
        _id: { $in: chats.map(c => c._id) }
    });
    return chats.map(chat => {
        const user = users.find(u => u._id.toString() === chat._id.toString());
        return {
            userId: user?._id,
            name: user?.name,
            lastMessage: chat.lastMessage,
            time: chat.time,
        };
    });
};
exports.getChatsUseCase = getChatsUseCase;
