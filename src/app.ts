import express from "express";
import dotenv from "dotenv";
const cors = require('cors');
import userRoutes from "./routes/user.routes";
import { errorMiddleware } from "./middleware/error.middleware";
import roleRoutes from "./routes/role.routes";
import roleaccessRoutes from "./routes/role.access.route";
import vehicleRoute from "./routes/vehicle.route";
import useraccessRoute from "./routes/user.access.routes";
import driverRoutes from "./routes/driverRoutes";
import organisationRoute from "./routes/organisation.route";
import routeMaster from "./routes/route.master.route";
import expenseshead from "./routes/expenses.head.route";

import swaggerUi from "swagger-ui-express";        
import { swaggerSpec } from "./config/swagger";
import partyRoutes from "./routes/partyRoutes";

dotenv.config();

const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// routes
app.use("/api/user", userRoutes);
app.use("/api/organisation", organisationRoute)
app.use("/api/role", roleRoutes);
app.use("/api/role-access", roleaccessRoutes);
app.use("/api/user-access", useraccessRoute)
app.use("/api/vehicle", vehicleRoute);
app.use("/api/route", routeMaster);
app.use("/api/driver", driverRoutes);
app.use("/api/expenseshead", expenseshead);
app.use("/api/party", partyRoutes);


app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.originalUrl}`
    });
});
app.use(errorMiddleware);

export default app;