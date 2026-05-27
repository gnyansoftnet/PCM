import { Request, Response } from "express";
import {
    createDriverService,
    getDriversService,
    getDriverByIdService,
    updateDriverService,
    deleteDriverService
} from "../service/driver.service";

export class DriverController {

    /* ---------------- CREATE ---------------- */

    async createDriver(req: Request, res: Response) {
        try {
            const result = await createDriverService(req.body);

            return res.status(201).json({
                success: true,
                message: "Driver Created Successfully",
                data: result
            });

        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    /* ---------------- GET LIST ---------------- */

    async getDriverList(_req: Request, res: Response) {
        try {
            const result = await getDriversService();

            return res.status(200).json({
                success: true,
                data: result
            });

        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    /* ---------------- GET BY ID ---------------- */

    async getDriverById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            const result = await getDriverByIdService(id);

            return res.status(200).json({
                success: true,
                data: result
            });

        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    /* ---------------- UPDATE ---------------- */

    async updateDriver(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            const result = await updateDriverService(id, req.body);

            return res.status(200).json({
                success: true,
                message: "Driver Updated Successfully",
                data: result
            });

        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    /* ---------------- DELETE ---------------- */

    async deleteDriver(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            const result = await deleteDriverService(id);

            return res.status(200).json({
                success: true,
                message: "Driver Deleted Successfully",
                data: result
            });

        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}