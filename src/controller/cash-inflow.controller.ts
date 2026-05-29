import { Request, Response, NextFunction } from "express";
import { OperationAction } from "../enums/operation-action.enum";

export class CashInFlowController {

    async saveUpdateDeleteCashInFlow(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {
                action,
                cifId,
                amount,
                date,
                remark,
                type,
                cifCode,
                orgCode,
                createdBy
            } = req.body;

            const validate = (value: any, field: string): boolean => {
                if (
                    value === undefined ||
                    value === null ||
                    value === ""
                ) {
                    res.status(400).json({
                        success: false,
                        message: `${field} is required.`
                    });
                    return false;
                }
                return true;
            };

            if (!validate(action, "action")) return;
            if (!validate(createdBy, "createdBy")) return;
            if (!validate(orgCode, "orgCode")) return;

            if (action === OperationAction.UPDATE) {
                if (!validate(cifId, "cifId")) return;
                if (!validate(cifCode, "cifCode")) return;
            }

            if (action === OperationAction.INSERT) {
                if (!validate(amount, "amount")) return;
                if (!validate(date, "date")) return;
                if (!validate(type, "type")) return;
            }
            if (action == OperationAction.DELETE) {
                if (!validate(cifId, "cifId")) return;
            }

            // Service call
            // const result = await cashInFlowService.saveUpdateDeleteCashInFlow(...);

            res.status(200).json({
                success: true,
                message: "Validation successful"
            });

        } catch (error) {
            next(error);
        }

    }
}