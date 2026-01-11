"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllUsers = exports.findUserByEmail = exports.createUser = void 0;
const userModel_1 = require("../models/userModel");
// Create a new user
const createUser = async (user) => {
    const newUser = new userModel_1.UserModel(user);
    await newUser.save();
    return newUser;
};
exports.createUser = createUser;
// Find user by email
const findUserByEmail = async (email) => {
    return await userModel_1.UserModel.findOne({ email });
};
exports.findUserByEmail = findUserByEmail;
const findAllUsers = async () => {
    return await userModel_1.UserModel.find();
};
exports.findAllUsers = findAllUsers;
