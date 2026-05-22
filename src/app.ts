import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes";
import { errorMiddleware } from "./middleware/error.middleware";

dotenv.config();

const app = express();

// middlewares
app.use(express.json());


// routes
app.use("/users", userRoutes);
app.use(errorMiddleware);

export default app;