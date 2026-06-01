// import { AppDataSource } from "../config/database";
// import { Driver } from "../entity/Driver";
// import { AppError } from "../utils/app.error";

// const driverRepo = AppDataSource.getRepository(Driver);

// export const createDriverService = async (data: Partial<Driver>) => {

//     const duplicate = await driverRepo.findOne({
//         where: [
//             { Driver_Name: data.Driver_Name, Dflag: 0 },
//             { Driver_Phone_No: data.Driver_Phone_No, Dflag: 0 },
//             { Driver_License_No: data.Driver_License_No, Dflag: 0 }
//         ]
//     });

//     if (duplicate) {
//         throw new AppError("Driver Already Exists", 400);
//     }

//     const driver = driverRepo.create({
//         ...data,
//         Dflag: 0
//     });

//     return await driverRepo.save(driver);
// };


// export const getDriversService = async () => {
//     return await driverRepo.find({
//         where: { Dflag: 0 },
//         order: { Driver_Id: "DESC" }
//     });
// };


// export const getDriverByIdService = async (id: number) => {

//     const driver = await driverRepo.findOne({
//         where: { Driver_Id: id, Dflag: 0 }
//     });

//     if (!driver) {
//         throw new AppError("Driver Not Found", 404);
//     }

//     return driver;
// };


// export const updateDriverService = async (
//     id: number,
//     data: Partial<Driver>
// ) => {

//     const driver = await driverRepo.findOne({
//         where: { Driver_Id: id, Dflag: 0 }
//     });

//     if (!driver) {
//         throw new AppError("Driver Not Found", 404);
//     }

//     const duplicate = await driverRepo.findOne({
//         where: [
//             { Driver_Name: data.Driver_Name, Dflag: 0 },
//             { Driver_Phone_No: data.Driver_Phone_No, Dflag: 0 },
//             { Driver_License_No: data.Driver_License_No, Dflag: 0 }
//         ]
//     });

//     if (duplicate && duplicate.Driver_Id !== id) {
//         throw new AppError("Duplicate Driver Exists", 400);
//     }

//     Object.assign(driver, data);

//     return await driverRepo.save(driver);
// };


// export const deleteDriverService = async (id: number) => {

//     const driver = await driverRepo.findOne({
//         where: { Driver_Id: id, Dflag: 0 }
//     });

//     if (!driver) {
//         throw new AppError("Driver Not Found", 404);
//     }

//     driver.Dflag = 1;

//     return await driverRepo.save(driver);
// };



import { ILike, Repository } from "typeorm";
import { AppDataSource } from "../config/database";
import { Driver } from "../entity/Driver";
import { Organisation } from "../entity/Orgnaisation";
import { User } from "../entity/User";
import { AppError } from "../utils/app.error";
import { PaginationQuery } from "../dto/pagination.query.dto";
import { PaginatedResult } from "../dto/pagination.result.dto";

export class DriverService {
    private readonly driverRepo: Repository<Driver>;
    private readonly orgRepo: Repository<Organisation>;
    private readonly userRepo: Repository<User>;

    constructor() {
        this.driverRepo = AppDataSource.getRepository(Driver);
        this.orgRepo = AppDataSource.getRepository(Organisation);
        this.userRepo = AppDataSource.getRepository(User);
    }


    async createDriver(data: Partial<Driver>): Promise<Driver> {

        const existUser = await this.userRepo.findOne({
            where: {
                userCode: data.Created_By,
                dflag: false,
            }
        });
        if (!existUser) {
            throw new AppError("User not found", 404);
        }

        const existOrg = await this.orgRepo.findOne({
            where: {
                Org_Code: data.Org_Code,
                Dflag: 0,
            }
        });
        if (!existOrg) {
            throw new AppError("Organisation not found", 404);
        }

        const duplicate = await this.driverRepo.findOne({
            where: [
                { Driver_Name: data.Driver_Name, Dflag: 0 },
                { Driver_Phone_No: data.Driver_Phone_No, Dflag: 0 },
                { Driver_License_No: data.Driver_License_No, Dflag: 0 },
            ]
        });
        if (duplicate) {
            throw new AppError("Driver already exists", 400);
        }

        const driver = this.driverRepo.create({
            Driver_Name: data.Driver_Name,
            Driver_License_No: data.Driver_License_No,
            Driver_Phone_No: data.Driver_Phone_No,
            Driver_Type: data.Driver_Type,
            Fin_Year: data.Fin_Year,
            Org_Code: data.Org_Code,
            Created_By: data.Created_By,
            Dflag: 0,
        });

        return await this.driverRepo.save(driver);
    }


    async updateDriver(
        driverId: number,
        data: Partial<Driver>
    ): Promise<Driver> {

        const existing = await this.driverRepo.findOne({
            where: { Driver_Id: driverId, Dflag: 0 },
        });
        if (!existing) {
            throw new AppError(`Driver with ID ${driverId} not found or is deleted`, 404);
        }

        const existOrg = await this.orgRepo.findOne({
            where: {
                Org_Code: data.Org_Code,
                Dflag: 0,
            }
        });
        if (!existOrg) {
            throw new AppError("Organisation not found", 404);
        }

        const existUser = await this.userRepo.findOne({
            where: {
                userCode: data.Modified_By,
                dflag: false,
            }
        });
        if (!existUser) {
            throw new AppError("User not found", 404);
        }

        const duplicate = await this.driverRepo.findOne({
            where: [
                { Driver_Name: data.Driver_Name, Dflag: 0 },
                { Driver_Phone_No: data.Driver_Phone_No, Dflag: 0 },
                { Driver_License_No: data.Driver_License_No, Dflag: 0 },
            ]
        });
        if (duplicate && duplicate.Driver_Id !== driverId) {
            throw new AppError("Duplicate driver exists", 400);
        }

        const updated = this.driverRepo.merge(existing, {
            Driver_Name: data.Driver_Name,
            Driver_License_No: data.Driver_License_No,
            Driver_Phone_No: data.Driver_Phone_No,
            Driver_Type: data.Driver_Type,
            Fin_Year: data.Fin_Year,
            Modified_By: data.Modified_By,
        });

        return await this.driverRepo.save(updated);
    }


    async deleteDriver(driverId: number, modifiedBy: string): Promise<{ message: string }> {

        const existing = await this.driverRepo.findOne({
            where: { Driver_Id: driverId, Dflag: 0 },
        });
        if (!existing) {
            throw new AppError(`Driver with ID ${driverId} not found or already deleted`, 404);
        }

        const existUser = await this.userRepo.findOne({
            where: {
                userCode: modifiedBy,
                dflag: false,
            }
        });
        if (!existUser) {
            throw new AppError("User not found", 404);
        }

        existing.Dflag = 1;
        existing.Modified_By = modifiedBy;
        await this.driverRepo.save(existing);

        return { message: `Driver ${driverId} deleted successfully` };
    }


    async getDriverById(driverId: number): Promise<Driver> {

        const driver = await this.driverRepo.findOne({
            where: { Driver_Id: driverId, Dflag: 0 },
        });
        if (!driver) {
            throw new AppError(`Driver with ID ${driverId} not found`, 404);
        }

        return driver;
    }


    async getAllDriversByOrgCode(
        orgCode: string,
        query: PaginationQuery,
    ): Promise<PaginatedResult<Driver>> {

        const existOrg = await this.orgRepo.findOne({
            where: { Org_Code: orgCode, Dflag: 0 },
        });
        if (!existOrg) {
            throw new AppError("Organisation not found", 404);
        }

        const page = Math.max(1, Number(query.page) || 1);
        const limit = Math.min(100, Math.max(1, Number(query.limit) || 10));
        const skip = (page - 1) * limit;
        const search = query.search?.trim() ?? "";

        const baseWhere = { Org_Code: orgCode, Dflag: 0 as any };

        const whereClause = search
            ? [
                { ...baseWhere, Driver_Name: ILike(`%${search}%`) },
                { ...baseWhere, Driver_License_No: ILike(`%${search}%`) },
                { ...baseWhere, Driver_Phone_No: ILike(`%${search}%`) },
                { ...baseWhere, Driver_Type: ILike(`%${search}%`) },
            ]
            : baseWhere;

        const [data, total] = await this.driverRepo.findAndCount({
            where: whereClause,
            order: { Created_Date: "DESC" },
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