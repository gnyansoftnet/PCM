import { ILike, Repository } from "typeorm";
import { Vehicle } from "../entity/Vehicle";
import { AppDataSource } from "../config/database";
import { AppError } from "../utils/app.error";
import { Organisation } from "../entity/Orgnaisation";
import { User } from "../entity/User";
import { VehicleType } from "../entity/VehicleType";
import { PaginationQuery } from "../dto/pagination.query.dto";
import { PaginatedResult } from "../dto/pagination.result.dto";

export class VehicleService {
    private vehicleRepo: Repository<Vehicle>;
    private orgRepo: Repository<Organisation>;
    private userRepo: Repository<User>;
    private vehicelType: Repository<VehicleType>;

    constructor() {
        this.vehicleRepo = AppDataSource.getRepository(Vehicle);
        this.orgRepo = AppDataSource.getRepository(Organisation);
        this.userRepo = AppDataSource.getRepository(User);
        this.vehicelType = AppDataSource.getRepository(VehicleType);

    }


    async createVehicle(data: Partial<Vehicle>): Promise<Vehicle> {

        const existUser = await this.userRepo.findOne({
            where: {
                userCode: data.createdBy,
                dflag: false,
            }
        });
        if (existUser == null) {
            throw new AppError('User Not found', 404);
        }

        const existOrg = await this.orgRepo.findOne({
            where: {
                Org_Code: data.orgCode,
                Dflag: 0,
            }

        });

        if (existOrg == null) {
            throw new AppError('Organisation Not found', 400);
        }

        const existvehicle = await this.vehicleRepo.findOne({
            where: {
                vehicleNo: data.vehicleNo,
                dflag: false,
            }
        });
        if (existvehicle) {
            throw new AppError('THis vehocel number is exist', 400);
        }

        const vehicle = this.vehicleRepo.create({
            vehicleNo: data.vehicleNo,
            vehicleType: data.vModel,
            vModel: data.vehicleType,
            vehicleCapacity: data.vehicleCapacity,
            caseApprox: data.caseApprox,
            orgCode: data.orgCode,
            createdBy: data.createdBy,
            dflag: false
        });
        return await this.vehicleRepo.save(vehicle);


    }



    async updateVehicle(
        vehicleId: number,
        data: Partial<Vehicle>,
    ): Promise<Vehicle> {

        const existing = await this.vehicleRepo.findOne({
            where: { vehicleId, dflag: false },
        });

        if (!existing) {
            throw new AppError(`Vehicle with ID ${vehicleId} not found or is deleted.`, 400);
        }


        const existOrg = await this.orgRepo.findOne({
            where: {
                Org_Code: data.orgCode,
                Dflag: 0,
            }

        });

        if (existOrg == null) {
            throw new AppError('Organisation Not found', 404);
        }


        const existUser = await this.userRepo.findOne({
            where: {
                userCode: data.modifiedBy,
                dflag: false,
            }
        });
        if (existUser == null) {
            throw new AppError('User Not found', 404);
        }

        const updated = this.vehicleRepo.merge(existing, {
            vehicleNo: data.vehicleNo,
            vModel: data.vehicleType,
            vehicleType: data.vModel,
            vehicleCapacity: data.vehicleCapacity,
            caseApprox: data.caseApprox,
            modifiedBy: data.modifiedBy,
        });

        return await this.vehicleRepo.save(updated);

    }


    async deleteVehicle(vehicleId: number, modifiedBy: string): Promise<{ message: string }> {

        const existing = await this.vehicleRepo.findOne({
            where: { vehicleId, dflag: false },
        });

        if (!existing) {
            throw new AppError(`Vehicle with ID ${vehicleId} not found or already deleted.`, 404);
        }

        const existUser = await this.userRepo.findOne({
            where: {
                userCode: modifiedBy,
                dflag: false,
            }
        });
        if (existUser == null) {
            throw new AppError('User Not found', 404);
        }

        existing.dflag = true;
        existing.modifiedBy = modifiedBy;
        await this.vehicleRepo.save(existing);
        return { message: `Vehicle ${vehicleId} deleted successfully.` };

    }

    async getVehicleById(vehicleId: number): Promise<Vehicle> {

        const vehicle = await this.vehicleRepo.findOne({
            where: { vehicleId, dflag: false },
        });

        if (!vehicle) {
            throw new AppError(`Vehicle with ID ${vehicleId} not found.`, 404);
        }

        return vehicle;

    }


    // async getAllVehiclesByOrgCode(orgCode: string): Promise<Vehicle[]> {

    //     const vehicles = await this.vehicleRepo.find({
    //         where: { orgCode, dflag: false },
    //         order: { createdDate: "DESC" },
    //     });

    //     return vehicles;

    // }


    async getAllVehiclesByOrgCode(
        orgCode: string,
        query: PaginationQuery,
    ): Promise<PaginatedResult<Vehicle>> {

        const existOrg = await this.orgRepo.findOne({ where: { Org_Code: orgCode, Dflag: 0 } });
        if (existOrg == null) throw new AppError("Organisation Not Found", 404);

        const page = Math.max(1, Number(query.page) || 1);
        const limit = Math.min(100, Math.max(1, Number(query.limit) || 10));
        const skip = (page - 1) * limit;
        const search = query.search?.trim() ?? "";

        // Base filter always applied
        const baseWhere = { orgCode, dflag: false as any };

        // Search across vehicleNo, vehicleType, vModel, vehicleOwnerName, vehicleCapacity
        const whereClause = search
            ? [
                { ...baseWhere, vehicleNo: ILike(`%${search}%`) },
                { ...baseWhere, vehicleType: ILike(`%${search}%`) },
                { ...baseWhere, vModel: ILike(`%${search}%`) },
                { ...baseWhere, vehicleOwnerName: ILike(`%${search}%`) },
                { ...baseWhere, vehicleCapacity: ILike(`%${search}%`) },
            ]
            : baseWhere;

        const [data, total] = await this.vehicleRepo.findAndCount({
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