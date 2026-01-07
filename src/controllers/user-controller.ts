
import { Request, Response } from "express";
import { getAllUser } from "../usecase/user/users";


export const getAllUsers = async (req: Request, res: Response) => {
    console.log('fsdfdsfds')

    try {
        const users = await getAllUser();
        console.log('users isss')
        console.log(users)
        res.status(201).json(users);
    } catch (err: any) {
        res.status(400).json({ message: err.message || "Error registering user" });
    }
};
