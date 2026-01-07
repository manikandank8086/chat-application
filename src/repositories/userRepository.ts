import { UserModel } from "../models/userModel";

// Create a new user
export const createUser = async (user: { name: string; email: string; password: string; phone: string }) => {
    const newUser = new UserModel(user);
    await newUser.save();
    return newUser;
};

// Find user by email
export const findUserByEmail = async (email: string) => {
    return await UserModel.findOne({ email });
};



export const findAllUsers = async ()=>{
    return await UserModel.find()
}


