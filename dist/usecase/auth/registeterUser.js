"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userRepository_1 = require("../../repositories/userRepository");
const jwt_1 = require("../../utils/jwt");
/* ================= REGISTER ================= */
const registerUser = async (data) => {
    const existingUser = await (0, userRepository_1.findUserByEmail)(data.email);
    if (existingUser) {
        throw new Error("Email already exists");
    }
    // 🔐 hash password
    const hashedPassword = await bcryptjs_1.default.hash(data.password, 10);
    const user = await (0, userRepository_1.createUser)({
        name: data.name,
        email: data.email,
        password: hashedPassword,
        phone: data.phone,
    });
    const token = (0, jwt_1.generateToken)({
        userId: user._id.toString(),
        email: user.email,
    });
    return {
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
        },
        token,
    };
};
exports.registerUser = registerUser;
/* ================= LOGIN ================= */
const loginUser = async (email, password) => {
    const user = await (0, userRepository_1.findUserByEmail)(email);
    if (!user) {
        throw new Error("User not found");
    }
    const isMatch = await bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }
    const token = (0, jwt_1.generateToken)({
        userId: user._id.toString(),
        email: user.email,
    });
    return {
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
        },
        token,
    };
};
exports.loginUser = loginUser;
