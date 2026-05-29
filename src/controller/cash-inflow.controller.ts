import { Request, Response, NextFunction } from "express";
import { OperationAction } from "../enums/operation-action.enum";
import { CashInFlowService } from "../service/cash-inflow.service";
import { asyncHandler } from "../middleware/async-handler";
import { AppError } from "../utils/app.error";

const cashInflowservice = new CashInFlowService();


export class CashInFlowController {

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

        const validate = (value: any, field: string): void => {
            if (value === undefined || value === null || value === '') {
                throw new AppError(`${field} is required`, 400);
            }
        };
        validate(action, 'action');
        validate(orgCode, 'orgCode');
        validate(createdBy, 'createdBy');

        if (action === OperationAction.INSERT) {
            validate(amount, 'amount');
            validate(date, 'date');
            validate(type, 'type');
        }

        if (action === OperationAction.UPDATE) {
            validate(cifId, 'cifId');
            validate(cifCode, 'cifCode');
            validate(amount, 'amount');
            validate(date, 'date');
            validate(type, 'type');
        }

        if (action === OperationAction.DELETE) {
            validate(cifId, 'cifId');
        }

        const message = await cashInflowservice.saveUpdateDeleteCashInflow(
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
}