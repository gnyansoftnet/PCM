// services/pettycashapprovelist.service.ts

import { AppDataSource } from "../config/database";

export class PettyCashApproveListService {

    // Existing List Method
    static async getList(data: any) {

        const result = await AppDataSource.query(
            `CALL USP_M_Cash_Issue_Trip_DTL(
                ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?
            )`,
            [
                data.Action,
                data.Issue_Id || 0,
                data.Driver_Id || 0,
                data.Vehicle_Id || 0,
                data.Voucher_No || '',
                data.DisplayLength || 10,
                data.DisplayStart || 0,
                data.SortCol || 0,
                data.SortDir || 'ASC',
                data.From_Date || null,
                data.To_Date || null,
                data.Org_Code || '',
                data.User_Code || '',
                data.Fin_Year || '',
                data.Vehicle_No || '',
                data.Driver_Name || '',
                data.Search || ''
            ]
        );

        return result;
    }

    // APPROVE / CONFIRM UPDATE
    static async updateStatus(data: any) {

        await AppDataSource.query(
            `CALL USP_T_STATUS_UPDATE_IUD(
                ?,?,?,?,?,?,?,@p_msg
            )`,
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