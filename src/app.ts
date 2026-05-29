import express from "express";
import dotenv from "dotenv";
const cors = require('cors');
// const actuator = require('express-actuator');
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

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/management/health", (req: express.Request, res: express.Response) => {
    res.status(200).json({
        status: "UP",
        timestamp: new Date().toISOString()
    });
});

app.get("/management/info", (req: express.Request, res: express.Response) => {
    res.status(200).json({
        build: {
            name: process.env.npm_package_name || "app",
            version: process.env.npm_package_version || "1.0.0",
            environment: process.env.NODE_ENV || "development"
        }
    });
});

app.get("/management/metrics", (req: express.Request, res: express.Response) => {
    const mem = process.memoryUsage();
    res.status(200).json({
        uptime: `${Math.floor(process.uptime())}s`,
        memory: {
            heapUsed: `${Math.round(mem.heapUsed / 1024 / 1024)}MB`,
            heapTotal: `${Math.round(mem.heapTotal / 1024 / 1024)}MB`,
            rss: `${Math.round(mem.rss / 1024 / 1024)}MB`
        }
    });
});

app.get("/management/liveness", (req: express.Request, res: express.Response) => {
    res.status(200).json({ status: "LIVE", timestamp: new Date().toISOString() });
});

app.get("/management/readiness", (req: express.Request, res: express.Response) => {
    res.status(200).json({ status: "READY", timestamp: new Date().toISOString() });
});;


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


app.use((req: express.Request, res: express.Response) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.originalUrl}`
    });
});

app.use(errorMiddleware);

export default app;


