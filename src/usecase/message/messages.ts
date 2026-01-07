import { UserModel } from "../../models/userModel";
import { findMessagesByUserId, getLastMessagesByUser } from "../../repositories/mesageRepository";

export const getMessage = async (userId: string) => {
  if (!userId) {
    throw new Error("UserId is required");
  }

  const messages = await findMessagesByUserId(userId);
  return messages;
};



export const getChatsUseCase = async (userId: string) => {
  const chats = await getLastMessagesByUser(userId);

  const users = await UserModel.find({
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