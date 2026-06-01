import { AppDataSource } from "../config/database";

export const dashboardAction = async (payload: any) => {

    const params = [
        payload.Action,
        payload.Issue_Id || 0,
        payload.Driver_Id || 0,
        payload.Voucher_No || '',
        payload.DisplayLength || 10,
        payload.DisplayStart || 1,
        payload.SortCol || 0,
        payload.SortDir || 'ASC',
        payload.From_Date || null,
        payload.To_Date || null,
        payload.Org_Code || '',
        payload.User_Code || '',
        payload.Fin_Year || '',
        payload.Search || ''
    ];

    const result = await AppDataSource.query(
        `CALL USP_T_DASHBOARD_DTL(
            ?,?,?,?,?,?,
            ?,?,?,?,?,?,
            ?,?
        )`,
        params
    );

    return result;
};