"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddlewares_1 = require("../middlewares/authMiddlewares");
const user_controller_1 = require("../controllers/user-controller");
const router = (0, express_1.Router)();
console.log('workingsss');
router.get("/", authMiddlewares_1.authMiddleware, user_controller_1.getAllUsers);
exports.default = router;
