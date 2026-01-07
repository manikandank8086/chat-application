import { Router, Request, Response } from "express";
import { authMiddleware } from "../middlewares/authMiddlewares";
import { getAllUsers } from "../controllers/user-controller";



const  router = Router()
console.log('workingsss')

router.get("/",authMiddleware,getAllUsers); 






export default router;
