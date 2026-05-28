import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
    path: path.join(__dirname, "../../", `.env.${process.env.NODE_ENV || "development"}`)
});

const isProduction = process.env.NODE_ENV === "production";

const baseConfig: DataSourceOptions = {
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [__dirname + "/../entity/*.{ts,js}"],
    migrations: [__dirname + "/../migrations/*.{ts,js}"],
    synchronize: false,
    migrationsRun: true,

};

const devConfig: DataSourceOptions = {
    ...baseConfig,
    logging: true,
    extra: { connectionLimit: 5 },

};

const prodConfig: DataSourceOptions = {
    ...baseConfig,
    logging: ["error", "warn"],
    extra: { connectionLimit: 20 },
    // ✅ Only enable SSL if your cloud DB supports it
    ...(process.env.DB_SSL === "true" && {
        ssl: { rejectUnauthorized: false }
    }),
};

export const AppDataSource = new DataSource(
    isProduction ? prodConfig : devConfig
);