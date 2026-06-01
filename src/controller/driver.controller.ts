// import { Request, Response } from "express";
// import {
//     createDriverService,
//     getDriversService,
//     getDriverByIdService,
//     updateDriverService,
//     deleteDriverService
// } from "../service/driver.service";

// export class DriverController {

//     async createDriver(req: Request, res: Response) {
//         try {
//             const result = await createDriverService(req.body);

//             return res.status(201).json({
//                 success: true,
//                 message: "Driver Created Successfully",
//                 data: result
//             });

//         } catch (error: any) {
//             return res.status(500).json({
//                 success: false,
//                 message: error.message
//             });
//         }
//     }

//     async getDriverList(_req: Request, res: Response) {
//         try {
//             const result = await getDriversService();

//             return res.status(200).json({
//                 success: true,
//                 data: result
//             });

//         } catch (error: any) {
//             return res.status(500).json({
//                 success: false,
//                 message: error.message
//             });
//         }
//     }


//     async getDriverById(req: Request, res: Response) {
//         try {
//             const id = Number(req.params.id);

//             const result = await getDriverByIdService(id);

//             return res.status(200).json({
//                 success: true,
//                 data: result
//             });

//         } catch (error: any) {
//             return res.status(500).json({
//                 success: false,
//                 message: error.message
//             });
//         }
//     }



//     async updateDriver(req: Request, res: Response) {
//         try {
//             const id = Number(req.params.id);

//             const result = await updateDriverService(id, req.body);

//             return res.status(200).json({
//                 success: true,
//                 message: "Driver Updated Successfully",
//                 data: result
//             });

//         } catch (error: any) {
//             return res.status(500).json({
//                 success: false,
//                 message: error.message
//             });
//         }
//     }



//     async deleteDriver(req: Request, res: Response) {
//         try {
//             const id = Number(req.params.id);

//             const result = await deleteDriverService(id);

//             return res.status(200).json({
//                 success: true,
//                 message: "Driver Deleted Successfully",
//                 data: result
//             });

//         } catch (error: any) {
//             return res.status(500).json({
//                 success: false,
//                 message: error.message
//             });
//         }
//     }
// }



import { Request, Response, NextFunction } from "express";
import { DriverService } from "../service/driver.service";


export class DriverController {
    private readonly driverService: DriverService;
    constructor() {
        this.driverService = new DriverService();
    }

    async createDriver(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const driver = await this.driverService.createDriver(req.body);
            res.status(201).json({
                success: true,
                message: "Driver created successfully.",
                data: driver,
            });
        } catch (error) {
            next(error);
        }
    }


    async updateDriver(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const driverId = parseInt(req.params.id as string);
            if (isNaN(driverId)) {
                res.status(400).json({ success: false, message: "Invalid driver ID." });
                return;
            }

            const driver = await this.driverService.updateDriver(driverId, req.body);
            res.status(200).json({
                success: true,
                message: "Driver updated successfully.",
                data: driver,
            });
        } catch (error) {
            next(error);
        }
    }


    async deleteDriver(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const driverId = parseInt(req.params.id as string);
            if (isNaN(driverId)) {
                res.status(400).json({ success: false, message: "Invalid driver ID." });
                return;
            }

            const modifiedBy: string = req.body.Modified_By;
            if (!modifiedBy) {
                res.status(400).json({ success: false, message: "Modified_By is required." });
                return;
            }

            const result = await this.driverService.deleteDriver(driverId, modifiedBy);
            res.status(200).json({
                success: true,
                message: result.message,
            });
        } catch (error) {
            next(error);
        }
    }


    async getDriverById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const driverId = parseInt(req.params.id as string);
            if (isNaN(driverId)) {
                res.status(400).json({ success: false, message: "Invalid driver ID." });
                return;
            }

            const driver = await this.driverService.getDriverById(driverId);
            res.status(200).json({
                success: true,
                data: driver,
            });
        } catch (error) {
            next(error);
        }
    }


    async getAllDriversByOrgCode(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { orgCode, page, limit, search } = req.query as {
                orgCode: string;
                page?: string;
                limit?: string;
                search?: string;
            };

            if (!orgCode) {
                res.status(400).json({ success: false, message: "orgCode query param is required." });
                return;
            }

            const result = await this.driverService.getAllDriversByOrgCode(orgCode, {
                page: page ? parseInt(page) : 1,
                limit: limit ? parseInt(limit) : 10,
                search: search ?? "",
            });

            res.status(200).json({ success: true, ...result });
        } catch (error: any) {
            res.status(error.statusCode ?? 500).json({ success: false, message: error.message });
        }
    }
}





