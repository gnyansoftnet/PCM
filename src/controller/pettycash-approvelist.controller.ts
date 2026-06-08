import { Request, Response } from "express";
import { PaginationQuery } from "../dto/pagination.query.dto";
import { PettyCashApproveListService } from "../service/pettycash-approvelist.service";

export class PettyCashApproveListController {
    private readonly pettyCashApproveListService: PettyCashApproveListService;

    constructor() {
        this.pettyCashApproveListService = new PettyCashApproveListService();
    }

    async getPettyCashApproveList(req: Request, res: Response) {
        try {
            const query: PaginationQuery = {
                page: req.query.page ? Number(req.query.page) : undefined,
                limit: req.query.limit ? Number(req.query.limit) : undefined,
                search: req.query.search as string | undefined,
            };
            const result = await this.pettyCashApproveListService.getPettyCashApproveList(req.body, query);
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




    async updateStatus(req: Request, res: Response) {
        try {

            const result = await this.pettyCashApproveListService.updateStatus(req.body);

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