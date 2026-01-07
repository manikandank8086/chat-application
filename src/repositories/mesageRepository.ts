import Message from "../models/messageModel";

export const findMessagesByUserId = async (userId: string) => {
  return await Message.find({
    $or: [
      { senderId: userId },
      { receiverId: userId },
    ],
  }).sort({ createdAt: 1 });
};




export const getLastMessagesByUser = async (userId: string) => {
  return Message.aggregate([
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

