import { AppDataSource } from "../config/database";
import { PaginatedResult } from "../dto/pagination.result.dto";
import { TripSettelmentRequest } from "../dto/trip-settelment-request.dt";
import { AppError } from "../utils/app.error";


const USP_M_Issue_Trip_IUD = 'CALL USP_T_Trip_Settelment_IUD(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@p_msg)';
const USP_T_Trip_Settelment_DTL = 'CALL USP_T_Trip_Settelment_DTL(?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
const USP_M_Cash_Issue_Trip_DTL = 'CALL USP_M_Cash_Issue_Trip_DTL(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';


export class TripSettelmentRepository {
    async saveUpdateDeleteTripSettelment(
        request: TripSettelmentRequest
    ): Promise<string> {
        try {
            await AppDataSource.query(USP_M_Issue_Trip_IUD, [
                request.Action,
                request.Issue_Id,
                request.Voucher_No,
                request.UpdateVoucher_No,
                request.Issue_Date,
                request.Settelment_Date,
                request.Driver_Id,
                request.Vehicle_Id,
                request.Issue_Route_Id,
                request.Driver_Mobile,
                request.Issue_Amount,
                request.Payble,
                request.Receivable,
                request.Grand_Total,
                request.Remarks,
                request.Route_Name,
                JSON.stringify(request.HeadDtls),
                request.Org_Code,
                request.Created_By,
                request.Fin_Year,
            ])
            return await this.readAndHandleMsg();

        } catch (error: any) {
            if (error instanceof AppError) throw error;
            throw new AppError(
                `[USP_M_Issue_Trip_IUD] action="${request.Action}" failed: ${error.message}`, 500
            );
        }

    }

    public async getAllTripSettlement(
        orgCode: string,
        userCode: string,
        fromDate: string,
        toDate: string,
        page: number,
        limit: number,
        search: string,
    ): Promise<PaginatedResult<any>> {
        try {
            const data = await AppDataSource.query(
                USP_T_Trip_Settelment_DTL,
                ["TODAY_ISSUE_All",
                    null, null,
                    null, limit, page,
                    null, null,
                    fromDate, toDate,
                    orgCode, userCode,
                    null, search || null]
            );
            console.log(data);
            const rows: any[] = Array.isArray(data[0]) ? data[0] : [];
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
        } catch (error: any) {
            if (error instanceof AppError) throw error;
            throw new AppError(
                `[USP_T_Trip_Settelment_DTL] failed: ${error.message}`, 500
            );
        }
    }
    public async getPendingTripSettlement(
        orgCode: string,
        userCode: string,
        page: number,
        limit: number,
    ): Promise<PaginatedResult<any>> {
        try {
            const data = await AppDataSource.query(
                USP_M_Cash_Issue_Trip_DTL,
                ["ISSUE_All_PENDING_LIST",
                    null, null,
                    null, null,
                    limit, page,
                    null, null,
                    null, null,
                    orgCode, userCode,
                    null, null,
                    null, null,]
            );
            console.log(data);
            const rows: any[] = Array.isArray(data[0]) ? data[0] : [];
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
        } catch (error: any) {
            if (error instanceof AppError) throw error;
            throw new AppError(
                `[USP_T_Trip_Settelment_DTL] failed: ${error.message}`, 500
            );
        }
    }


    public async getIsseueCashByVoucherNumber(
        orgCode: string,
        userCode: string,
        voucherNumber: string,

    ): Promise<any> {
        try {
            const data = await AppDataSource.query(
                USP_M_Cash_Issue_Trip_DTL,
                ["GET_ISSUE_CASH_ALL",
                    null, null,
                    null, voucherNumber,
                    null, null,
                    null, null,
                    null, null,
                    orgCode, userCode,
                    null, null,
                    null, null,]
            );
            console.log(data);
            const issue: any[] = Array.isArray(data[0]) ? data[0] : [];
            const party: any[] = Array.isArray(data[1]) ? data[1] : [];
            const routes: any[] = Array.isArray(data[2]) ? data[2] : [];
            return {
                data: { issue, party, routes }
            };
        } catch (error: any) {
            if (error instanceof AppError) throw error;
            throw new AppError(
                `[USP_M_Cash_Issue_Trip_DTL] failed: ${error.message}`, 500
            );
        }
    }
    public async getTripSettelmentVoucherNumber(
        voucherNo: string
    ): Promise<any> {
        try {
            const data = await AppDataSource.query(
                USP_T_Trip_Settelment_DTL,
                ["GET_TRIP_BY_VOUCHER",
                    null, null,
                    voucherNo,
                    null, null,
                    null, null,
                    null, null,
                    null, null,
                    null, null]
            );
            const [tripDetails, headDetails, routes] = data;
            return { tripDetails, headDetails, routes };
        } catch (error: any) {
            if (error instanceof AppError) throw error;
            throw new AppError(
                `[GET_TRIP_BY_VOUCHER] failed: ${error.message}`, 500
            );
        }
    }
    public async getTripSettelmentPrintByVoucherNumber(
        voucherNo: string
    ): Promise<any> {
        try {
            const data = await AppDataSource.query(
                USP_M_Cash_Issue_Trip_DTL,
                ["GET_ISSUE_SETTELMENT_PRINT",
                    null, null,
                    null, voucherNo,
                    null, null,
                    null, null,
                    null, null,
                    null, null,
                    null, null,
                    null, null
                ]
            );
            const [issueDetails, headDetails] = data;
            return { issueDetails, headDetails };
        } catch (error: any) {
            if (error instanceof AppError) throw error;
            throw new AppError(
                `[USP_M_Cash_Issue_Trip_DTL] failed: ${error.message}`, 500
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