import { Repository } from "typeorm";
import { AppDataSource } from "../config/database";
import { ReportRequestDto } from "../dto/report-request.dto";
import { User } from "../entity/User";
import { Organisation } from "../entity/Orgnaisation";
import ReportRepository from "../repository/report.repository";
import { AppError } from "../utils/app.error";
import { PaginationQuery } from "../dto/pagination.query.dto";


class ReportService {
  private readonly orgRepo: Repository<Organisation>;
  private readonly userRepo: Repository<User>;
  private readonly reportRepo: ReportRepository;
  constructor() {
    this.orgRepo = AppDataSource.getRepository(Organisation);
    this.userRepo = AppDataSource.getRepository(User);
    this.reportRepo = new ReportRepository();
  }

  async getAllReports(params: ReportRequestDto, query: PaginationQuery): Promise<any> {
    const existOrg = await this.orgRepo.findOne({ where: { Org_Code: params.p_Org_Code, Dflag: 0 } });
    if (!existOrg) throw new AppError("Organisation not found", 404);
    const existUser = await this.userRepo.findOne({ where: { userCode: params.p_User_Code, dflag: false } });
    if (!existUser) throw new AppError("User not found", 404);
    const page = Math.max(1, query.page ?? 1);
    const limit = Math.min(100, Math.max(1, query.limit ?? 10));
    return ReportRepository.getAllReports(params, page, limit);
  }

}

export default ReportService;