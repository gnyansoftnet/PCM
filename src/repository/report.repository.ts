import { AppDataSource } from "../config/database";
import { ReportRequestDto } from "../dto/report-request.dto";




const USP_R_ALL_REPORT = 'CALL USP_R_ALL_REPORT(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';

class ReportRepository {
    static async getAllReports(params: ReportRequestDto, page: number,
        limit: number): Promise<any> {
        const values = [
            params.p_Action,
            params.p_Issue_Id || null,
            params.p_Driver_Id || null,
            params.p_Voucher_No || null,
            limit,
            page,
            params.p_SortCol || null,
            params.p_SortDir || null,
            params.p_From_Date || null,
            params.p_To_Date || null,
            params.p_Org_Code || null,
            params.p_User_Code || null,
            params.p_Fin_Year || null,
            params.p_Vehicle_Type || null,
            params.p_Vehicle_No || null,
            params.p_Type || null,
            params.p_Route || null,
            params.p_Search || null,
        ];

        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();

        try {
            const result = await queryRunner.query(USP_R_ALL_REPORT, values);
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
        } finally {
            await queryRunner.release();
        }
    }
}

export default ReportRepository;