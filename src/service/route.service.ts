import { Repository } from "typeorm";
import { Vehicle } from "../entity/Vehicle";
import { AppDataSource } from "../config/database";
import { AppError } from "../utils/app.error";
import { Organisation } from "../entity/Orgnaisation";
import { User } from "../entity/User";
import { RouteMaster } from "../entity/RouteMaster";
import { generateRouteCode } from "../utils/route.code.generation";
import { ILike } from "typeorm/browser";
import { PaginationQuery } from "../dto/pagination.query.dto";
import { PaginatedResult } from "../dto/pagination.result.dto";

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

        const routeCode = await generateRouteCode();

        const existUser = await this.userRepo.findOne({
            where: { userCode: data.createdBy, dflag: false },
        });
        if (existUser == null) {
            throw new AppError("User Not Found", 404);
        }

        const existOrg = await this.orgRepo.findOne({
            where: { Org_Code: data.orgCode, Dflag: 0 },
        });
        if (existOrg == null) {
            throw new AppError("Organisation Not Found", 404);
        }

        const route = this.routeRepo.create({
            routeName: data.routeName,
            routeFrom: data.routeFrom,
            routeTo: data.routeTo,
            routeDistance: data.routeDistance,
            routeCode: routeCode,
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
            where: { Org_Code: data.orgCode ?? existing.orgCode, Dflag: 0 },
        });
        if (existOrg == null) {
            throw new AppError("Organisation Not Found", 404);
        }

        const existUser = await this.userRepo.findOne({
            where: { userCode: data.modifiedBy, dflag: false },
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
            modifiedBy: data.modifiedBy,
        });

        return await this.routeRepo.save(updated);
    }



    async deleteRoute(routeId: number, modifiedBy: string): Promise<{ message: string }> {

        const existing = await this.routeRepo.findOne({
            where: { routeId, dflag: false },
        });
        if (!existing) {
            throw new AppError(`Route with ID ${routeId} not found or already deleted.`, 404);
        }

        const existUser = await this.userRepo.findOne({
            where: { userCode: modifiedBy, dflag: false },
        });
        if (existUser == null) {
            throw new AppError("User Not Found", 404);
        }

        existing.dflag = true;
        existing.modifiedBy = modifiedBy;
        await this.routeRepo.save(existing);

        return { message: `Route ${routeId} deleted successfully.` };
    }


    async getRouteById(routeId: number): Promise<RouteMaster> {

        const route = await this.routeRepo.findOne({
            where: { routeId, dflag: false },
        });

        if (!route) {
            throw new AppError(`Route with ID ${routeId} not found.`, 404);
        }

        return route;
    }

    async getAllRoutesByOrgCode(
        orgCode: string,
        query: PaginationQuery,
    ): Promise<PaginatedResult<RouteMaster>> {

        const existOrg = await this.orgRepo.findOne({ where: { Org_Code: orgCode, Dflag: 0 } });
        if (existOrg == null) throw new AppError("Organisation Not Found", 404);

        const page = Math.max(1, Number(query.page) || 1);
        const limit = Math.min(100, Math.max(1, Number(query.limit) || 10));
        const skip = (page - 1) * limit;
        const search = query.search?.trim() ?? "";

        // Base filter always applied
        const baseWhere = { orgCode, dflag: false as any };

        // Search across routeName, routeCode, routeNo, routeFrom, routeTo
        const whereClause = search
            ? [
                { ...baseWhere, routeName: ILike(`%${search}%`) },
                { ...baseWhere, routeCode: ILike(`%${search}%`) },
                { ...baseWhere, routeNo: ILike(`%${search}%`) },
                { ...baseWhere, routeFrom: ILike(`%${search}%`) },
                { ...baseWhere, routeTo: ILike(`%${search}%`) },
            ]
            : baseWhere;

        const [data, total] = await this.routeRepo.findAndCount({
            where: whereClause,
            order: { createdDate: "DESC" },
            skip,
            take: limit,
        });

        const totalPages = Math.ceil(total / limit);

        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1,
            },
        };
    }
}




