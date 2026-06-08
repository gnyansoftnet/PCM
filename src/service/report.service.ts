import { AppDataSource } from "../config/database";

interface ReportParams {
  p_Action: string;
  p_Issue_Id?: number;
  p_Driver_Id?: number;
  p_Voucher_No?: string;
  p_DisplayLength: number;
  p_DisplayStart: number;
  p_SortCol?: number;
  p_SortDir?: string;
  p_From_Date?: string;
  p_To_Date?: string;
  p_Org_Code?: string;
  p_User_Code?: string;
  p_Fin_Year?: string;
  p_Vehicle_Type?: string;
  p_Vehicle_No?: string;
  p_Type?: string;
  p_Route?: number;
  p_Search?: string;
}

class ReportService {
  static async getAllReports(params: ReportParams) {
    const sql = `CALL USP_R_ALL_REPORT(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    const values = [
      params.p_Action,
      params.p_Issue_Id || null,
      params.p_Driver_Id || null,
      params.p_Voucher_No || null,
      params.p_DisplayLength,
      params.p_DisplayStart,
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
      const result = await queryRunner.query(sql, values);
      return result;
    } finally {
      await queryRunner.release();
    }
  }
}

export default ReportService;