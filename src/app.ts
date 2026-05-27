import express from "express";
import dotenv from "dotenv";
const cors = require('cors');
import userRoutes from "./routes/user.routes";
import { errorMiddleware } from "./middleware/error.middleware";
import roleRoutes from "./routes/role.routes";
import roleaccessRoutes from "./routes/role.access.route";
import vehicleRoute from "./routes/vehicle.route";
import useraccessRoute from "./routes/user.access.routes";
import driverRoutes from "./routes/driver.routes";
import organisationRoute from "./routes/organisation.route";
import routeMasterRoute from "./routes/route.master.route";
import expensesHeadRoute from "./routes/expenses.head.route";
import partyRoutes from "./routes/party.routes";
import authRoute from "./routes/auth.route";

dotenv.config();

const app = express();

// middlewares
app.use(express.json());
app.use(cors());


// routes
app.use("/api/auth", authRoute)
app.use("/api/user", userRoutes);
app.use("/api/organisation", organisationRoute)
app.use("/api/role", roleRoutes);
app.use("/api/role-access", roleaccessRoutes);
app.use("/api/user-access", useraccessRoute)
app.use("/api/vehicle", vehicleRoute);
app.use("/api/route", routeMasterRoute);
app.use("/api/driver", driverRoutes);
app.use("/api/expenseshead", expensesHeadRoute);
app.use("/api/party", partyRoutes);


app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.originalUrl}`
    });
});
app.use(errorMiddleware);

export default app;