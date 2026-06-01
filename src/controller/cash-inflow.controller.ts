import { Request, Response, NextFunction } from "express";
import { OperationAction } from "../enums/operation-action.enum";
import { CashInFlowService } from "../service/cash-inflow.service";
import { asyncHandler } from "../middleware/async-handler";
import { AppError } from "../utils/app.error";
import { PaginationQuery } from "../dto/pagination.query.dto";




export class CashInFlowController {
    private readonly cashInFlowService: CashInFlowService;
    constructor() {
        this.cashInFlowService = new CashInFlowService();
    }

    getAllCashInflowByOrg = asyncHandler(async (req: Request, res: Response) => {
        const { orgCode } = req.body;
        this.validate(orgCode, 'orgCode');

        const query: PaginationQuery = {
            page: req.query.page ? Number(req.query.page) : undefined,
            limit: req.query.limit ? Number(req.query.limit) : undefined,
            search: req.query.search as string | undefined,
        };

        const { data, meta } = await this.cashInFlowService.getAllCashInflowByOrg(orgCode, query);

        res.status(200).json({ success: true, type: 'SUCCESS', result: data, meta });

    })
    getCashInflowDetailsByCifId = asyncHandler(async (req: Request, res: Response) => {
        const {
            cifId
        } = req.body;

        this.validate(cifId, 'cifId');
        const result = await this.cashInFlowService.getCashInflowDetailsByCifId(cifId);
        res.status(
            200
        ).json({
            success: true,
            type: 'SUCCESS',
            result,
        });

    })

    saveUpdateDeleteCashInFlow = asyncHandler(async (req: Request, res: Response) => {
        const {
            action,
            cifId,
            amount,
            date,
            remark,
            type,
            cifCode,
            orgCode,
            createdBy,
        } = req.body;


        this.validate(action, 'action');
        this.validate(orgCode, 'orgCode');
        this.validate(createdBy, 'createdBy');

        if (action === OperationAction.INSERT) {
            this.validate(amount, 'amount');
            this.validate(date, 'date');
            this.validate(type, 'type');
        }

        if (action === OperationAction.UPDATE) {
            this.validate(cifId, 'cifId');
            this.validate(cifCode, 'cifCode');
            this.validate(amount, 'amount');
            this.validate(date, 'date');
            this.validate(type, 'type');
        }

        if (action === OperationAction.DELETE) {
            this.validate(cifId, 'cifId');
        }

        const message = await this.cashInFlowService.saveUpdateDeleteCashInflow(
            action, cifId, amount, date,
            remark, type, cifCode,
            orgCode, createdBy,
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