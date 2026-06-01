import { Request, Response, NextFunction } from "express";
import { OperationAction } from "../enums/operation-action.enum";
import { CashInFlowService } from "../service/cash-inflow.service";
import { asyncHandler } from "../middleware/async-handler";
import { AppError } from "../utils/app.error";
import { PaginationQuery } from "../dto/pagination.query.dto";
import { OtherExpensesService } from "../service/other-expenses.service";




export class OtherExpensesController {
    private readonly otherExpensesService: OtherExpensesService;
    constructor() {
        this.otherExpensesService = new OtherExpensesService();
    }

    getAllOtherExpensesByOrg = asyncHandler(async (req: Request, res: Response) => {
        const orgCode = req.params.orgCode as string;
        this.validate(orgCode, 'orgCode');

        const query: PaginationQuery = {
            page: req.query.page ? Number(req.query.page) : undefined,
            limit: req.query.limit ? Number(req.query.limit) : undefined,
            search: req.query.search as string | undefined,
        };

        const { data, meta } = await this.otherExpensesService.getAllOtherExpensesByOrg(orgCode, query);

        res.status(200).json({ success: true, type: 'SUCCESS', result: data, meta });

    })
    getOtherExpensesDetailsById = asyncHandler(async (req: Request, res: Response) => {
        const {
            id
        } = req.body;

        this.validate(id, 'id');
        const result = await this.otherExpensesService.getOtherExpensesDetailsById(id);
        res.status(
            200
        ).json({
            success: true,
            type: 'SUCCESS',
            result,
        });

    })

    saveUpdateDeleteOtherExpenses = asyncHandler(async (req: Request, res: Response) => {
        const {
            action,
            id,
            expensesAmount,
            expDate,
            expensesName,
            expCode,
            orgCode,
            createdBy,
        } = req.body;


        this.validate(action, 'action');
        this.validate(orgCode, 'orgCode');
        this.validate(createdBy, 'createdBy');

        if (action === OperationAction.INSERT) {
            this.validate(expensesAmount, 'expensesAmount');
            this.validate(expDate, 'expDate');
            this.validate(expensesName, 'expensesName');
            
        }

        if (action === OperationAction.UPDATE) {
            this.validate(id, 'id');
            this.validate(expensesAmount, 'expensesAmount');
            this.validate(expDate, 'expDate');
            this.validate(expensesName, 'expensesName');
            this.validate(expCode, 'expCode');
        }

        if (action === OperationAction.DELETE) {
            this.validate(id, 'id');
        }

        const message = await this.otherExpensesService.saveUpdateDeleteOtherExpenses(
            action, id, expensesAmount, expDate,
            expensesName, expCode, orgCode, createdBy,
        );
        res.status(
            action === OperationAction.INSERT ? 201 : 200
        ).json({
            success: true,
            type: 'SUCCESS',
            message,
        });
    });


    private validate(value: any, field: string): void {
        if (value === undefined || value === null || value === '') {
            throw new AppError(`${field} is required`, 400);
        }
    }

}