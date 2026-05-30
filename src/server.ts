// src/server.ts
import "reflect-metadata";
import dotenv from "dotenv";
import app from "./app";
import { AppDataSource } from "./config/database";
import { seedAdminUser } from "./seed/admin.seed";

const env = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${env}` });

const PORT = process.env.PORT || 4000;

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
        console.log("NODE_ENV:", process.env.NODE_ENV);
        console.log("DB_HOST:", process.env.DB_HOST);
        console.log("DB_DATABASE:", process.env.DB_DATABASE);

        // 4. Start server
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT} 🚀`);
            console.log(`Environment: ${env} 🌍`);
        });

    } catch (error) {
        console.error("Server startup failed ❌", error);
        process.exit(1);
    }
};

startServer();