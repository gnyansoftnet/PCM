import { Repository } from "typeorm";
import { Vehicle } from "../entity/Vehicle";
import { AppDataSource } from "../config/database";
import { AppError } from "../utils/app.error";
import { Organisation } from "../entity/Orgnaisation";
import { User } from "../entity/User";
import { RouteMaster } from "../entity/RouteMaster";

export class RouteService {
    private routeRepo: Repository<RouteMaster>;
    private orgRepo: Repository<Organisation>;
    private userRepo: Repository<User>;


    constructor() {
        this.routeRepo = AppDataSource.getRepository(RouteMaster);
        this.orgRepo = AppDataSource.getRepository(Organisation);
        this.userRepo = AppDataSource.getRepository(User);

    }


    async createRoute(data: Partial<RouteMaster>): Promise<RouteMaster> {

        const existUser = await this.userRepo.findOne({
            where: { userCode: data.createdBy },
        });
        if (existUser == null) {
            throw new AppError("User Not Found", 404);
        }

        const existOrg = await this.orgRepo.findOne({
            where: { Org_Code: data.orgCode },
        });
        if (existOrg == null) {
            throw new AppError("Organisation Not Found", 404);
        }

        const route = this.routeRepo.create({
            routeName: data.routeName,
            routeFrom: data.routeFrom,
            routeTo: data.routeTo,
            routeDistance: data.routeDistance,
            routeCode: data.routeCode,
            routeNo: data.routeNo,
            orgCode: data.orgCode,
            createdBy: data.createdBy,
            dflag: false,
        });

        return await this.routeRepo.save(route);
    }



    async updateRoute(routeId: number, data: Partial<RouteMaster>): Promise<RouteMaster> {

        const existing = await this.routeRepo.findOne({
            where: { routeId, dflag: false },
        });
        if (!existing) {
            throw new AppError(`Route with ID ${routeId} not found or is deleted.`, 404);
        }

        const existOrg = await this.orgRepo.findOne({
            where: { Org_Code: data.orgCode ?? existing.orgCode },
        });
        if (existOrg == null) {
            throw new AppError("Organisation Not Found", 404);
        }

        const existUser = await this.userRepo.findOne({
            where: { userCode: data.modifiedBy },
        });
        if (existUser == null) {
            throw new AppError("User Not Found", 404);
        }

        // If routeCode is changing, check for duplicates
        if (data.routeCode && data.routeCode !== existing.routeCode) {
            const duplicate = await this.routeRepo.findOne({
                where: {
                    routeCode: data.routeCode,
                    orgCode: data.orgCode ?? existing.orgCode,
                    dflag: false,
                },
            });
            if (duplicate) {
                throw new AppError(
                    `Route with code "${data.routeCode}" already exists for this organisation.`,
                    400,
                );
            }
        }

        const updated = this.routeRepo.merge(existing, {
            routeName: data.routeName,
            routeFrom: data.routeFrom,
            routeTo: data.routeTo,
            routeDistance: data.routeDistance,
            routeCode: data.routeCode,
            routeNo: data.routeNo,
            finYear: data.finYear,
            modifiedBy: data.modifiedBy,
        });

        return await this.routeRepo.save(updated);
    }





}