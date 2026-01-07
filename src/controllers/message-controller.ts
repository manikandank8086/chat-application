import { Response } from "express";
import { AuthRequest } from "../types/authRequest";
import { getChatsUseCase, getMessage } from "../usecase/message/messages";

export const getMessages = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.params;

    const messages = await getMessage(userId);
    res.status(200).json(messages);
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to fetch messages",
    });
  }
};

export const getChats = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userId = req.user.id;

  const chats = await getChatsUseCase(userId);
  res.status(200).json(chats);
};
