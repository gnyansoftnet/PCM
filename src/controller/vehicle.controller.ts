import { Request, Response, NextFunction } from "express";
import { VehicleService } from "../service/vehicle.service";


const vehicleService = new VehicleService();

export class VehicleController {


    async createVehicle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const vehicle = await vehicleService.createVehicle(req.body);
            res.status(201).json({
                success: true,
                message: "Vehicle created successfully.",
                data: vehicle,
            });
        } catch (error) {
            next(error);
        }
    }


    async updateVehicle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const vehicleId = parseInt(req.params.id as string);
            if (isNaN(vehicleId)) {
                res.status(400).json({ success: false, message: "Invalid vehicle ID." });
                return;
            }

            const vehicle = await vehicleService.updateVehicle(vehicleId, req.body);
            res.status(200).json({
                success: true,
                message: "Vehicle updated successfully.",
                data: vehicle,
            });
        } catch (error) {
            next(error);
        }
    }


    async deleteVehicle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const vehicleId = parseInt(req.params.id as string);
            if (isNaN(vehicleId)) {
                res.status(400).json({ success: false, message: "Invalid vehicle ID." });
                return;
            }

            const modifiedBy: string = req.body.modifiedBy;
            if (!modifiedBy) {
                res.status(400).json({ success: false, message: "modifiedBy is required." });
                return;
            }

            const result = await vehicleService.deleteVehicle(vehicleId, modifiedBy);
            res.status(200).json({
                success: true,
                message: result.message,
            });
        } catch (error) {
            next(error);
        }
    }


    async getVehicleById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const vehicleId = parseInt(req.params.id as string);
            if (isNaN(vehicleId)) {
                res.status(400).json({ success: false, message: "Invalid vehicle ID." });
                return;
            }

            const vehicle = await vehicleService.getVehicleById(vehicleId);
            res.status(200).json({
                success: true,
                data: vehicle,
            });
        } catch (error) {
            next(error);
        }
    }


    async getAllVehiclesByOrgCode(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const orgCode = req.params.orgCode as string;
            if (!orgCode) {
                res.status(400).json({ success: false, message: "orgCode is required." });
                return;
            }

            const vehicles = await vehicleService.getAllVehiclesByOrgCode(orgCode);
            res.status(200).json({
                success: true,
                count: vehicles.length,
                data: vehicles,
            });
        } catch (error) {
            next(error);
        }
    }
}