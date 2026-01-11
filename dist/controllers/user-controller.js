"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = void 0;
const users_1 = require("../usecase/user/users");
const getAllUsers = async (req, res) => {
    console.log('fsdfdsfds');
    try {
        const users = await (0, users_1.getAllUser)();
        console.log('users isss');
        console.log(users);
        res.status(201).json(users);
    }
    catch (err) {
        res.status(400).json({ message: err.message || "Error registering user" });
    }
};
exports.getAllUsers = getAllUsers;
