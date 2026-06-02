import { AppDataSource } from "../config/database";
import { IssuePettyRequest } from "../dto/Issue-petty-request.dto";
import { IssuePettyResponseDto } from "../dto/issue-trip-response.dt";
import { PaginatedResult } from "../dto/pagination.result.dto";
import { OperationAction } from "../enums/operation-action.enum";
import { AppError } from "../utils/app.error";

const USP_M_Issue_Trip_IUD = 'CALL USP_M_Issue_Trip_IUD(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@p_msg)';
const USP_M_Cash_Issue_Trip_DTL = 'CALL USP_M_Cash_Issue_Trip_DTL(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';

const USP_M_Party_DTL = 'CALL USP_M_Party_DTL(?,?)';

export class IssuePettyRepository {
    async saveUpdateDeleteIssuePetty(
        request: IssuePettyRequest
    ): Promise<string> {
        try {
            await AppDataSource.query(USP_M_Issue_Trip_IUD, [
                request.action,
                request.issueId,
                request.voucherNo,
                request.issueDate,
                request.driverId,
                request.vehicleId,
                request.issueRouteId,
                request.partyCode,
                request.driverMobile,
                request.vehicleNo,
                request.driverName,
                request.vehicleType,
                request.issueAmount,
                request.remarks,
                request.orgCode,
                request.createdBy,
                request.cartonQuantity,
                request.gatepassNo,
                request.petrolPumpVoucher,
                request.dieselQuantity,
                request.finYear,
                JSON.stringify(request.partyDtlJson),
                JSON.stringify(request.routeDtlJson)
            ])
            return await this.readAndHandleMsg();

        } catch (error: any) {
            if (error instanceof AppError) throw error;
            throw new AppError(
                `[USP_M_Issue_Trip_IUD] action="${request.action}" failed: ${error.message}`, 500
            );
        }

    }

    public async getAllIssuesPettty(
        orgCode: string,
        userCode: string,
        fromDate: string,
        toDate: string,
        page: number,
        limit: number,
        search: string,
    ): Promise<PaginatedResult<IssuePettyResponseDto>> {
        try {
            const data = await AppDataSource.query(
                USP_M_Cash_Issue_Trip_DTL,
                ["TODAY_ISSUE_All",
                    null, null,
                    null, null,
                    limit, page,
                    null, null,
                    fromDate, toDate,
                    orgCode, userCode,
                    null, null, null, search || null]
            );
            console.log(data);
            const total: number = data[0][0]?.total ?? 0;
            const rows: IssuePettyResponseDto[] = data[0] ?? [];
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
                `[USP_M_Cash_Issue_Trip_DTL] failed: ${error.message}`, 500
            );
        }
    }
    public async getIssuePettyByVoucherNumber(
        voucherNo: string
    ): Promise<any> {
        try {
            const data = await AppDataSource.query(
                USP_M_Cash_Issue_Trip_DTL,
                ["GET_ISSUE_CASH_ALL",
                    null, null,
                    null, voucherNo,
                    null, null,
                    null, null,
                    null, null,
                    null, null,
                    null, null, null, null]
            );
            return data[0][0] ?? {}
        } catch (error: any) {
            if (error instanceof AppError) throw error;
            throw new AppError(
                `[USP_M_Cash_Issue_Trip_DTL] failed: ${error.message}`, 500
            );
        }
    }

    async getPartyByRoutes(routes: string): Promise<any[]> {
        try {
            const data = await AppDataSource.query(
                USP_M_Party_DTL,
                ["GET_PARTY_BY_ROUTE", routes]
            );
            return data[0] ?? []
        } catch (error: any) {
            if (error instanceof AppError) throw error;
            throw new AppError(
                `[USP_M_Party_DTL] failed: ${error.message}`, 500
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