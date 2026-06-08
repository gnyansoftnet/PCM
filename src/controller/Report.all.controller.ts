import { Request, Response } from "express";
import ReportService from "../service/report.service";

class ReportController {
  static async getReports(req: Request, res: Response) {
    try {
      const result = await ReportService.getAllReports(req.body);

      return res.status(200).json({
        success: true,
        message: "Reports fetched successfully",
        data: result[0], // MySQL returns nested array
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default ReportController;