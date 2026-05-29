"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const database_1 = require("./config/database");
const admin_seed_1 = require("./seed/admin.seed");
dotenv_1.default.config({
    path: `.env.${process.env.NODE_ENV || "development"}`
});
const PORT = process.env.PORT || 3000;
const startServer = async () => {
    try {
        // 1. Connect DB
        await database_1.AppDataSource.initialize();
        console.log("DB Connected ✅");
        // 2. Run pending migrations
        const migrations = await database_1.AppDataSource.runMigrations();
        if (migrations.length > 0) {
            console.log(`Migrations applied ✅: ${migrations.map(m => m.name).join(", ")}`);
        }
        else {
            console.log("No pending migrations ✅");
        }
        // 3. Seed admin
        await (0, admin_seed_1.seedAdminUser)();
        console.log("NODE_ENV:", process.env.NODE_ENV);
        console.log("DB_HOST:", process.env.DB_HOST);
        console.log("DB_DATABASE:", process.env.DB_DATABASE);
        // 4. Start server
        app_1.default.listen(PORT, () => {
            console.log(`Server running on port ${PORT} 🚀`);
            console.log(`Environment: ${process.env.NODE_ENV} 🌍`);
        });
    }
    catch (error) {
        console.error("Server startup failed ❌", error);
        process.exit(1);
    }
};
startServer();
