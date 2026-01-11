"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const registeterUser_1 = require("../usecase/auth/registeterUser");
const register = async (req, res) => {
    const { name, email, password, phone } = req.body;
    try {
        const user = await (0, registeterUser_1.registerUser)({ name, email, password, phone });
        res.status(201).json(user);
    }
    catch (err) {
        res.status(400).json({ message: err.message || "Error registering user" });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await (0, registeterUser_1.loginUser)(email, password);
        res.status(200).json(result);
    }
    catch (err) {
        res.status(400).json({
            message: err.message || "Error logging in",
        });
    }
};
exports.login = login;
