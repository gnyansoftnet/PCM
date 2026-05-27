// src/server.ts
import "reflect-metadata";
import dotenv from "dotenv";
import app from "./app";
import { AppDataSource } from "./config/database";
import { seedAdminUser } from "./seed/admin.seed";

dotenv.config({
    path: `.env.${process.env.NODE_ENV || "development"}`
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        // 1. Connect DB
        await AppDataSource.initialize();
        console.log("DB Connected ✅");

        // 2. Run pending migrations
        const migrations = await AppDataSource.runMigrations();
        if (migrations.length > 0) {
            console.log(`Migrations applied ✅: ${migrations.map(m => m.name).join(", ")}`);
        } else {
            console.log("No pending migrations ✅");
        }

        // 3. Seed admin
        await seedAdminUser();

        // 4. Start server
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT} 🚀`);
            console.log(`Environment: ${process.env.NODE_ENV} 🌍`);
        });

    } catch (error) {
        console.error("Server startup failed ❌", error);
        process.exit(1);
    }
};

startServer();