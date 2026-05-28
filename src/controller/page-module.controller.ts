import { Request, Response, NextFunction } from "express";
import { PageModuleService } from "../service/page-module.service";

const pageModuleService = new PageModuleService()

export class PageModuleController {
    async getVehicleById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const vehicle = await pageModuleService.getAllPageModule();
            res.status(200).json({
                success: true,
                data: vehicle,
            });
        } catch (error) {
            next(error);
        }
    }
}