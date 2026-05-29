import { OperationAction } from "../enums/operation-action.enum";
import { CashInflowRepository } from "../repository/cash-inflow.repository";

export class CashInFlowService {
    private readonly cashInFlowRepo = new CashInflowRepository();
    async saveUpdateDeleteCashInflow(
        action: OperationAction,
        cifId: number,
        amount: number,
        date: string,
        remark: string,
        type: string,
        cifCode: string,
        orgCode: string,
        createdBy: string,
    ):Promise<string> {
        
        const currentYear = new Date().getFullYear();
        const finYear = `${currentYear}-${currentYear + 1}`;
        return this.cashInFlowRepo.saveUpdateDeleteCashInflow(
            action, cifId, amount, date, remark, type, cifCode, orgCode, createdBy, finYear
        )

    }


}