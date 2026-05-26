import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes";
import { errorMiddleware } from "./middleware/error.middleware";
import roleRoutes from "./routes/role.routes";
import roleaccessRoutes from "./routes/role.access.route";
import vehicleRoute from "./routes/vehicle.route";
import useraccessRoute from "./routes/user.access.routes";
import driverRoutes from "./routes/driverRoutes";

dotenv.config();

const app = express();

// middlewares
app.use(express.json());


// routes
app.use("/api/user", userRoutes);
app.use("/api/role", roleRoutes);
app.use("/api/role-access", roleaccessRoutes);
app.use("/api/user-access", useraccessRoute)
app.use("/api/vehicle", vehicleRoute);
app.use("/api", driverRoutes);


app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.originalUrl}`
    });
});
app.use(errorMiddleware);

export default app;