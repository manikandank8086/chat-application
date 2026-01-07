import { Router } from "express";
import { login, register } from "../controllers/auth-controller";
import { authMiddleware } from "../middlewares/authMiddlewares";

const router = Router();
router.post("/register", register);
router.post("/login" , login)

export default router;
