"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const message_controller_1 = require("../controllers/message-controller");
const authMiddlewares_1 = require("../middlewares/authMiddlewares");
const router = (0, express_1.Router)();
router.get("/messages/:userId", authMiddlewares_1.authMiddleware, message_controller_1.getMessages);
router.get("/chats", authMiddlewares_1.authMiddleware, message_controller_1.getChats);
exports.default = router;
