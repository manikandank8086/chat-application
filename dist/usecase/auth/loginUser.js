"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const userRepository_1 = require("../../repositories/userRepository");
const jwt_1 = require("../../utils/jwt");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
/* ================= LOGIN ================= */
const loginUser = async (email, password) => {
    email = email.trim();
    password = password.trim();
    const user = await (0, userRepository_1.findUserByEmail)(email);
    if (!user)
        throw new Error("User not found");
    const isMatch = await bcryptjs_1.default.compare(password, user.password);
    if (!isMatch)
        throw new Error("Invalid credentials");
    const token = (0, jwt_1.generateToken)({
        userId: user._id.toString(),
        email: user.email,
    });
    return { user, token };
};
exports.loginUser = loginUser;
