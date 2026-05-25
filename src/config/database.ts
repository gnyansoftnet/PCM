import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "../entity/User";
import { Role } from "../entity/Role";
import { PageModule } from "../entity/PageModule";
import { Token } from "../entity/Token";
import { Organisation } from "../entity/Orgnaisation";
import { Branch } from "../entity/Branch";
import { Useraccess } from "../entity/Useraccess";
import { Page } from "../entity/Page";
import { Roleaccess } from "../entity/Roleaccess";
import { Vehicle } from "../entity/Vehicle";
import { VehicleType } from "../entity/VehicleType";


dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    logging: false,
    entities: [User, Role, PageModule, Token, Organisation, Branch, Useraccess, Page, Roleaccess, Vehicle, VehicleType],

});

