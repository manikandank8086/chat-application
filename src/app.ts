import express, { Application, Request, Response } from "express";
import cors from "cors";

// Import routes
import authRoutes from "./routes/auth-routes";
import userRoutes from "./routes/user-routes";
import messageRouter from "./routes/message-routes";

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use('/api/messages',messageRouter)

// Test route
app.get("/", (_req: Request, res: Response) => {
  res.send("Backend is running 🚀");
});

export default app;
