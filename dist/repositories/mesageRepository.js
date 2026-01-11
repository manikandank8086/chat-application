"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLastMessagesByUser = exports.findMessagesByUserId = void 0;
const messageModel_1 = __importDefault(require("../models/messageModel"));
const findMessagesByUserId = async (userId) => {
    return await messageModel_1.default.find({
        $or: [
            { senderId: userId },
            { receiverId: userId },
        ],
    }).sort({ createdAt: 1 });
};
exports.findMessagesByUserId = findMessagesByUserId;
const getLastMessagesByUser = async (userId) => {
    return messageModel_1.default.aggregate([
        {
            $match: {
                $or: [
                    { senderId: userId },
                    { receiverId: userId },
                ],
            },
        },
        {
            $sort: { createdAt: -1 },
        },
        {
            $group: {
                _id: {
                    $cond: [
                        { $eq: ["$senderId", userId] },
                        "$receiverId",
                        "$senderId",
                    ],
                },
                lastMessage: { $first: "$text" },
                time: { $first: "$createdAt" },
            },
        },
    ]);
};
exports.getLastMessagesByUser = getLastMessagesByUser;
