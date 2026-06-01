import express from "express";
import dotenv from "dotenv";
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
import pageModuleRoute from "./routes/page-module.route";
import cashInflowRoute from "./routes/cash-inflow.route";
import { corsLogger } from "./utils/cors-logger";
import { corsErrorHandler, corsMiddleware, handlePreflight } from "./middleware/cors.middleware";
import otherExpensesRoute from "./routes/other-expenses.route";

dotenv.config();

const app = express();

app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
    app.use(corsLogger);
}
app.options('/{*path}', handlePreflight);
app.use(corsMiddleware);

app.get("/management/health", (req: express.Request, res: express.Response) => {
    res.status(200).json({
        status: "UP",
        timestamp: new Date().toISOString()
    });
});


app.use("/api/auth", authRoute);
app.use("/api/user", userRoutes);
app.use("/api/organisation", organisationRoute);
app.use("/api/page-module", pageModuleRoute);
app.use("/api/role", roleRoutes);
app.use("/api/role-access", roleaccessRoutes);
app.use("/api/user-access", useraccessRoute);
app.use("/api/vehicle", vehicleRoute);
app.use("/api/route", routeMasterRoute);
app.use("/api/driver", driverRoutes);
app.use("/api/expenseshead", expensesHeadRoute);
app.use("/api/party", partyRoutes);
app.use("/api/cash-inflow", cashInflowRoute);
app.use("/api/other-expenses", otherExpensesRoute);


app.use((req: express.Request, res: express.Response) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.originalUrl}`
    });
});

app.use(errorMiddleware);
app.use(corsErrorHandler);
export default app;


