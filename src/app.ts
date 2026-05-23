import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes";
import { errorMiddleware } from "./middleware/error.middleware";
import roleRoutes from "./routes/role.routes";

dotenv.config();

const app = express();

// middlewares
app.use(express.json());


// routes
app.use("/user", userRoutes);
app.use("/role", roleRoutes);
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.originalUrl}`
    });
});
app.use(errorMiddleware);

export default app;