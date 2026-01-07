import { Router } from "express";
import { getChats, getMessages } from "../controllers/message-controller";
import { authMiddleware } from "../middlewares/authMiddlewares";


const  router = Router()

router.get("/messages/:userId",authMiddleware, getMessages); 
router.get("/chats", authMiddleware, getChats);





export default router