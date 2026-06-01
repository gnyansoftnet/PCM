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

        await AppDataSource.initialize();
        console.log("DB Connected ✅");

        const migrations = await AppDataSource.runMigrations();
        if (migrations.length > 0) {
            console.log(`Migrations applied ✅: ${migrations.map(m => m.name).join(", ")}`);
        } else {
            console.log("No pending migrations ✅");
        }

        await seedAdminUser();
        console.log("NODE_ENV:", process.env.NODE_ENV);
        console.log("DB_HOST:", process.env.DB_HOST);
        console.log("DB_DATABASE:", process.env.DB_DATABASE);

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