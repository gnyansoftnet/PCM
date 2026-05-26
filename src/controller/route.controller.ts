import { RouteService } from "../service/route.service";
import { Request, Response } from "express";

const routeService = new RouteService();

export class RouteController {


    async createRoute(req: Request, res: Response): Promise<void> {
        try {
            const result = await routeService.createRoute(req.body);
            res.status(201).json({ success: true, data: result });
        } catch (error: any) {
            res.status(error.statusCode ?? 500).json({ success: false, message: error.message });
        }
    }

    async updateRoute(req: Request, res: Response): Promise<void> {
        try {
            const routeId = parseInt(req.params.id as string);
            const result = await routeService.updateRoute(routeId, req.body);
            res.status(200).json({ success: true, data: result });
        } catch (error: any) {
            res.status(error.statusCode ?? 500).json({ success: false, message: error.message });
        }
    }


    async deleteRoute(req: Request, res: Response): Promise<void> {
        try {
            const routeId = parseInt(req.params.id as string);
            const { modifiedBy } = req.body;
            const result = await routeService.deleteRoute(routeId, modifiedBy);
            res.status(200).json({ success: true, ...result });
        } catch (error: any) {
            res.status(error.statusCode ?? 500).json({ success: false, message: error.message });
        }
    }

    async getRouteById(req: Request, res: Response): Promise<void> {
        try {
            const routeId = parseInt(req.params.id as string);
            const result = await routeService.getRouteById(routeId);
            res.status(200).json({ success: true, data: result });
        } catch (error: any) {
            res.status(error.statusCode ?? 500).json({ success: false, message: error.message });
        }
    }

    async getAllRoutesByOrgCode(req: Request, res: Response): Promise<void> {
        try {
            const { orgCode, page, limit, search } = req.query as {
                orgCode: string;
                page?: string;
                limit?: string;
                search?: string;
            };

            if (!orgCode) {
                res.status(400).json({ success: false, message: "orgCode query param is required" });
                return;
            }

            const result = await routeService.getAllRoutesByOrgCode(orgCode, {
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