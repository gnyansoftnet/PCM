import { AppDataSource } from "../config/database";
import { Driver } from "../entity/Driver";
import { AppError } from "../utils/app.error";

const driverRepo = AppDataSource.getRepository(Driver);

/* ---------------- CREATE ---------------- */

export const createDriverService = async (data: Partial<Driver>) => {

    const duplicate = await driverRepo.findOne({
        where: [
            { Driver_Name: data.Driver_Name, Dflag: 0 },
            { Driver_Phone_No: data.Driver_Phone_No, Dflag: 0 },
            { Driver_License_No: data.Driver_License_No, Dflag: 0 }
        ]
    });

    if (duplicate) {
        throw new AppError("Driver Already Exists", 400);
    }

    const driver = driverRepo.create({
        ...data,
        Dflag: 0
    });

    return await driverRepo.save(driver);
};

/* ---------------- GET ALL ---------------- */

export const getDriversService = async () => {
    return await driverRepo.find({
        where: { Dflag: 0 },
        order: { Driver_Id: "DESC" }
    });
};

/* ---------------- GET BY ID ---------------- */

export const getDriverByIdService = async (id: number) => {

    const driver = await driverRepo.findOne({
        where: { Driver_Id: id, Dflag: 0 }
    });

    if (!driver) {
        throw new AppError("Driver Not Found", 404);
    }

    return driver;
};

/* ---------------- UPDATE ---------------- */

export const updateDriverService = async (
    id: number,
    data: Partial<Driver>
) => {

    const driver = await driverRepo.findOne({
        where: { Driver_Id: id, Dflag: 0 }
    });

    if (!driver) {
        throw new AppError("Driver Not Found", 404);
    }

    const duplicate = await driverRepo.findOne({
        where: [
            { Driver_Name: data.Driver_Name, Dflag: 0 },
            { Driver_Phone_No: data.Driver_Phone_No, Dflag: 0 },
            { Driver_License_No: data.Driver_License_No, Dflag: 0 }
        ]
    });

    if (duplicate && duplicate.Driver_Id !== id) {
        throw new AppError("Duplicate Driver Exists", 400);
    }

    Object.assign(driver, data);

    return await driverRepo.save(driver);
};

/* ---------------- DELETE (SOFT) ---------------- */

export const deleteDriverService = async (id: number) => {

    const driver = await driverRepo.findOne({
        where: { Driver_Id: id, Dflag: 0 }
    });

    if (!driver) {
        throw new AppError("Driver Not Found", 404);
    }

    driver.Dflag = 1;

    return await driverRepo.save(driver);
};