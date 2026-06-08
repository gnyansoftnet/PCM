import { AppDataSource } from "../config/database";
import { PaginatedResult } from "../dto/pagination.result.dto";


const USP_M_Cash_Issue_Trip_DTL = 'CALL USP_M_Cash_Issue_Trip_DTL(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
const USP_T_STATUS_UPDATE_IUD = 'CALL USP_T_STATUS_UPDATE_IUD(?,?,?,?,?,?,?,@p_msg)';

export class PettyCashApproveListRepository {

    public async getPettyCashApproveList(data: any,
        page: number,
        limit: number,
        search: string
    ): Promise<PaginatedResult<any>> {
        const result = await AppDataSource.query(
            USP_M_Cash_Issue_Trip_DTL,
            [
                data.Action,
                data.Issue_Id || 0,
                data.Driver_Id || 0,
                data.Vehicle_Id || 0,
                data.Voucher_No || '',
                limit || 10,
                page || 0,
                data.SortCol || 0,
                data.SortDir || 'ASC',
                data.From_Date || null,
                data.To_Date || null,
                data.Org_Code || '',
                data.User_Code || '',
                data.Fin_Year || '',
                data.Vehicle_No || '',
                data.Driver_Name || '',
                search || ''
            ]
        );

        console.log(result);
        const rows: any[] = Array.isArray(result[0]) ? result[0] : [];
        const total: number = rows.length > 0 ? Number(rows[0].PageSize) : 0;
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
    }



    public async updateStatus(data: any) {
        await AppDataSource.query(
            USP_T_STATUS_UPDATE_IUD,
            [
                data.Action,
                data.Voucher_No,
                data.Decline_Reason || '',
                data.User_Code || '',
                data.Org_Code || '',
                data.Created_By,
                data.Fin_Year || ''
            ]
        );

        const msgResult: any = await AppDataSource.query(
            `SELECT @p_msg AS Message`
        );

        return {
            message: msgResult[0].Message
        };
    }
}