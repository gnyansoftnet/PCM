import { Double } from "typeorm/driver/mongodb/bson.typings.js";
import { AppDataSource } from "../config/database";
import { OperationAction } from "../enums/operation-action.enum";


const USP_M_CASHINFLOW_IUD = 'USP_M_CASHINFLOW_IUD(?,?,?,?,?,?,?,?,?,?,?)';

export class CashInflowRepository {

    private async saveUpdateDeleteCashInflow(
        action: OperationAction,
        cifId: number,
        amount: number,
        date: string,
        remark: string,
        type: string,
        cifCode: string,
        orgCode: string,
        createdBy: string,
        finYear: string,
    ): Promise<void> {
        try {
            const result = await AppDataSource.query(USP_M_CASHINFLOW_IUD, [
                action,
                cifId,
                amount,
                date,
                remark,
                type,
                cifCode,
                orgCode,
                createdBy,
                finYear,
            ])

        } catch (error: any) {
            throw new Error(
                `[USP_M_CASHINFLOW_IUD] action="${action}" failed: ${error.message}`
            );

        }

    }
}