"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUser = void 0;
const userRepository_1 = require("../../repositories/userRepository");
const getAllUser = async () => {
    const users = await (0, userRepository_1.findAllUsers)();
    return users;
};
exports.getAllUser = getAllUser;
