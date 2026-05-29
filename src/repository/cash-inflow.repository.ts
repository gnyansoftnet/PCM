import { Double } from "typeorm/driver/mongodb/bson.typings.js";
import { AppDataSource } from "../config/database";
import { OperationAction } from "../enums/operation-action.enum";
import { AppError } from "../utils/app.error";


const USP_M_CASHINFLOW_IUD = 'CALL USP_M_CASHINFLOW_IUD(?,?,?,?,?,?,?,?,?,?,@p_msg)';

export class CashInflowRepository {
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
        finYear: string,
    ): Promise<string> {
        try {
            await AppDataSource.query(USP_M_CASHINFLOW_IUD, [
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
            return await this.readAndHandleMsg();

        } catch (error: any) {
            if (error instanceof AppError) throw error;
            throw new AppError(
                `[USP_M_CASHINFLOW_IUD] action="${action}" failed: ${error.message}`, 500
            );
        }

    }



    private async readAndHandleMsg(): Promise<string> {
        const msgResult = await AppDataSource.query('SELECT @p_msg AS p_msg');
        console.log(msgResult);
        const p_msg = msgResult[0]?.p_msg ?? '';
        console.log(p_msg);

        if (p_msg.startsWith('WARNING')) {
            throw new AppError(p_msg.replace('WARNING: ', ''), 400);
        }

        if (p_msg.startsWith('ERROR')) {
            throw new AppError(p_msg.replace('ERROR: ', ''), 500);
        }

        return p_msg.replace('SUCCESS: ', '');
    }
}