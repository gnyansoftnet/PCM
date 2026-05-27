import { Request, Response, NextFunction } from "express";
import { ExpensesHeadService } from "../service/expenses-head.service";

const expensesHeadService = new ExpensesHeadService();

export class ExpensesHeadController {

    async createExpensesHead(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const expensesHead = await expensesHeadService.createExpensesHead(req.body);
            res.status(201).json({
                success: true,
                message: "Expenses Head created successfully.",
                data: expensesHead,
            });
        } catch (error) {
            next(error);
        }
    }


    async updateExpensesHead(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const headId = parseInt(req.params.id as string);
            if (isNaN(headId)) {
                res.status(400).json({ success: false, message: "Invalid Head ID." });
                return;
            }

            const expensesHead = await expensesHeadService.updateExpensesHead(headId, req.body);
            res.status(200).json({
                success: true,
                message: "Expenses Head updated successfully.",
                data: expensesHead,
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteExpensesHead(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const headId = parseInt(req.params.id as string);
            if (isNaN(headId)) {
                res.status(400).json({ success: false, message: "Invalid Head ID." });
                return;
            }

            const modifiedBy: string = req.body.modifiedBy;
            if (!modifiedBy) {
                res.status(400).json({ success: false, message: "modifiedBy is required." });
                return;
            }

            const result = await expensesHeadService.deleteExpensesHead(headId, modifiedBy);
            res.status(200).json({
                success: true,
                message: result.message,
            });
        } catch (error) {
            next(error);
        }
    }

    async getExpensesHeadById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const headId = parseInt(req.params.id as string);
            if (isNaN(headId)) {
                res.status(400).json({ success: false, message: "Invalid Head ID." });
                return;
            }

            const expensesHead = await expensesHeadService.getExpensesHeadById(headId);
            res.status(200).json({
                success: true,
                data: expensesHead,
            });
        } catch (error) {
            next(error);
        }
    }

    async getAllExpensesHeadsByOrgCode(req: Request, res: Response): Promise<void> {
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

            const result = await expensesHeadService.getAllExpensesHeadsByOrgCode(orgCode, {
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