import { Double } from "typeorm/driver/mongodb/bson.typings.js";
import { AppDataSource } from "../config/database";
import { OperationAction } from "../enums/operation-action.enum";
import { AppError } from "../utils/app.error";
import { PaginatedResult } from "../dto/pagination.result.dto";
import { OtherExpensesResponseDto } from "../dto/other-expenses-responses.dto";


const USP_M_OTHEREXPENSES_IUD = 'CALL USP_T_Other_Expenses_IUD(?,?,?,?,?,?,?,?,?,@p_msg)';
const USP_OTHEREXPENSES_ALLEXPENSESBYORG = 'CALL USP_OTHEREXPENSES_ALLEXPENSESBYORG(?,?,?,?)';
const USP_OTHEREXPENSES_DETAILSBYID = 'CALL USP_OTHEREXPENSES_DETAILSBYID(?)';

export class OtherExpensesRepository {
    async saveUpdateDeleteOtherExpenses(
        action: OperationAction,
        id: number,
        expensesAmount: number,
        expDate: string,
        expensesName: string,
        expCode: string,
        orgCode: string,
        createdBy: string,
        finYear: string,
    ): Promise<string> {
        try {
            await AppDataSource.query(USP_M_OTHEREXPENSES_IUD, [
                action,
                id,
                expensesAmount,
                expDate,
                expensesName,
                expCode,
                orgCode,
                createdBy,
                finYear,
            ])
            return await this.readAndHandleMsg();

        } catch (error: any) {
            if (error instanceof AppError) throw error;
            throw new AppError(
                `[USP_M_OTHEREXPENSES_IUD] action="${action}" failed: ${error.message}`, 500
            );
        }

    }

    public async getAllOtherExpensesByOrg(
        orgCode: string,
        page: number,
        limit: number,
        search: string,
    ): Promise<PaginatedResult<OtherExpensesResponseDto>> {
        try {
            const data = await AppDataSource.query(
                USP_OTHEREXPENSES_ALLEXPENSESBYORG,
                [orgCode, page, limit, search || null]
            );
            const total: number = data[0][0]?.total ?? 0;
            const rows: OtherExpensesResponseDto[] = data[1] ?? [];
            const totalPages = Math.ceil(total / limit);

            return {
                data: rows,
                meta: {
                    total,
                    page,
                    limit,
                    totalPages,
                    hasNextPage: page < totalPages,
                    hasPrevPage: page > 1,
                },
            };
        } catch (error: any) {
            if (error instanceof AppError) throw error;
            throw new AppError(
                `[USP_OTHEREXPENSES_ALLEXPENSESBYORG] failed: ${error.message}`, 500
            );
        }
    }
    public async getOtherExpensesDetailsById(
        cifId: number
    ): Promise<OtherExpensesResponseDto> {
        try {
            const data = await AppDataSource.query(USP_OTHEREXPENSES_DETAILSBYID, [cifId]);
            return data[0][0] ?? {}
        } catch (error: any) {
            if (error instanceof AppError) throw error;
            throw new AppError(
                `[USP_OTHEREXPENSES_DETAILSBYID] failed: ${error.message}`, 500
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