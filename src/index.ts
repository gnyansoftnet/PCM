import express from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./config/database";
import userRoutes from "./routes/user.routes";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/users", userRoutes);

AppDataSource.initialize()
    .then(() => {
        console.log("DB Connected");

        app.listen(process.env.PORT, () => {
            console.log(
                `Server running on ${process.env.PORT}`
            );
        });
    })
    .catch((err) => console.log(err));