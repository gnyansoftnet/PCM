import { AppDataSource } from "../config/database";
import { IssueTripRequest } from "../dto/Issue-trip-request.dto";
import { OperationAction } from "../enums/operation-action.enum";
import { AppError } from "../utils/app.error";

const USP_M_Issue_Trip_IUD = 'CALL USP_M_Issue_Trip_IUD(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@p_msg)';
const USP_OTHEREXPENSES_ALLEXPENSESBYORG = 'CALL USP_OTHEREXPENSES_ALLEXPENSESBYORG(?,?,?,?)';
const USP_OTHEREXPENSES_DETAILSBYID = 'CALL USP_OTHEREXPENSES_DETAILSBYID(?)';

export class IssuePettyRepository {
    async saveUpdateDeleteIssuePetty(
        request: IssueTripRequest
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
                `[USP_M_Issue_Trip_IUD] action="${action}" failed: ${error.message}`, 500
            );
        }

    }

    // public async getAllOtherExpensesByOrg(
    //     orgCode: string,
    //     page: number,
    //     limit: number,
    //     search: string,
    // ): Promise<PaginatedResult<OtherExpensesResponseDto>> {
    //     try {
    //         const data = await AppDataSource.query(
    //             USP_OTHEREXPENSES_ALLEXPENSESBYORG,
    //             [orgCode, page, limit, search || null]
    //         );
    //         const total: number = data[0][0]?.total ?? 0;
    //         const rows: OtherExpensesResponseDto[] = data[1] ?? [];
    //         const totalPages = Math.ceil(total / limit);

    //         return {
    //             data: rows,
    //             meta: {
    //                 total,
    //                 page,
    //                 limit,
    //                 totalPages,
    //                 hasNextPage: page < totalPages,
    //                 hasPrevPage: page > 1,
    //             },
    //         };
    //     } catch (error: any) {
    //         if (error instanceof AppError) throw error;
    //         throw new AppError(
    //             `[USP_OTHEREXPENSES_ALLEXPENSESBYORG] failed: ${error.message}`, 500
    //         );
    //     }
    // }
    // public async getOtherExpensesDetailsById(
    //     cifId: number
    // ): Promise<OtherExpensesResponseDto> {
    //     try {
    //         const data = await AppDataSource.query(USP_OTHEREXPENSES_DETAILSBYID, [cifId]);
    //         return data[0][0] ?? {}
    //     } catch (error: any) {
    //         if (error instanceof AppError) throw error;
    //         throw new AppError(
    //             `[USP_OTHEREXPENSES_DETAILSBYID] failed: ${error.message}`, 500
    //         );
    //     }
    // }



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