    import { Request, Response } from "express";
import { loginUser, registerUser } from "../usecase/auth/registeterUser";
import { error } from "node:console";

export const register = async (req: Request, res: Response) => {
    const { name, email, password, phone } = req.body;

    try {
        const user = await registerUser({ name, email, password, phone });
        res.status(201).json(user);
    } catch (err: any) {
        res.status(400).json({ message: err.message || "Error registering user" });
    }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await loginUser(email, password);

    res.status(200).json(result);
  } catch (err: any) {
    res.status(400).json({
      message: err.message || "Error logging in",
    });
  }
};