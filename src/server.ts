import dotenv from "dotenv";
import app from "./app";
import { AppDataSource } from "./config/database";
import { seedAdminUser } from "./seed/admin.seed";

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        // 1. connect DB
        await AppDataSource.initialize();
        console.log("DB Connected ✅");

        // 2. seed admin
        await seedAdminUser();

        // 3. start server
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT} 🚀`);
        });

    } catch (error) {
        console.error("Server startup failed ❌", error);
    }
};

startServer();