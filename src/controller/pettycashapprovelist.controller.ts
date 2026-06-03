// controllers/pettycashapprovelist.controller.ts

import { Request, Response } from "express";
import { PettyCashApproveListService } from "../service/pettycashapprovelist.service";

export class PettyCashApproveListController {

    // ================= LIST =================
    static async getList(req: Request, res: Response) {
        try {

            const result = await PettyCashApproveListService.getList(req.body);

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

    // ================= APPROVE / CONFIRM =================
    static async updateStatus(req: Request, res: Response) {
        try {

            const result = await PettyCashApproveListService.updateStatus(req.body);

            return res.status(200).json({
                success: true,
                message: result.message
            });

        } catch (error: any) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }
    }
}