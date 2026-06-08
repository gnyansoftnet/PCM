import { Request, Response } from "express";
import ReportService from "../service/report.service";
import { PaginationQuery } from "../dto/pagination.query.dto";

class ReportController {
  private readonly reportService: ReportService;
  constructor() {
    this.reportService = new ReportService();
  }
  async getReports(req: Request, res: Response) {
    try {
      const query: PaginationQuery = {
        page: req.query.page ? Number(req.query.page) : undefined,
        limit: req.query.limit ? Number(req.query.limit) : undefined,
      };
      const result = await this.reportService.getAllReports(req.body, query);
      return res.status(200).json({
        success: true,
        message: "Reports fetched successfully",
        data: result,
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