import { Repository } from "typeorm";
import { OperationAction } from "../enums/operation-action.enum";
import { CashInflowRepository } from "../repository/cash-inflow.repository";
import { Organisation } from "../entity/Orgnaisation";
import { AppDataSource } from "../config/database";
import { AppError } from "../utils/app.error";
import { User } from "../entity/User";
import { CashInflowResponseDto } from "../dto/cash-inflow-response.dto";
import { PaginatedResult } from "../dto/pagination.result.dto";
import { PaginationQuery } from "../dto/pagination.query.dto";
import { IssuePettyRepository } from "../repository/issue-petty.repository";
import { IssuePettyRequest } from "../dto/Issue-petty-request.dto";
import { IssuePettyResponseDto } from "../dto/issue-trip-response.dt";

export class IssuePettyService {
    private readonly orgRepo: Repository<Organisation>;
    private readonly userRepo: Repository<User>;
    private readonly issuePettyRepo: IssuePettyRepository;
    constructor() {
        this.orgRepo = AppDataSource.getRepository(Organisation);
        this.userRepo = AppDataSource.getRepository(User);
        this.issuePettyRepo = new IssuePettyRepository();
    }

    async saveUpdateDeleteIssuePetty(
        request: IssuePettyRequest
    ): Promise<string> {
        const existOrg = await this.orgRepo.findOne({
            where: {
                Org_Code: request.orgCode,
                Dflag: 0,
            }
        });
        if (existOrg == null) {
            throw new AppError("Organisation not found", 404);
        }
        const existuser = await this.userRepo.findOne({
            where: {
                userCode: request.createdBy,
                dflag: false,
            }
        });
        if (existuser == null) {
            throw new AppError("Created by not found", 404);
        }
        request.finYear = `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`;
        const result = this.issuePettyRepo.saveUpdateDeleteIssuePetty(
            request
        );
        return result;

    }

    async getAllIssuesPettty(
        orgCode: string,
        userCode: string,
        fromDate: string,
        toDate: string,
        query: PaginationQuery,
    ): Promise<PaginatedResult<IssuePettyResponseDto>> {

        const existOrg = await this.orgRepo.findOne({ where: { Org_Code: orgCode, Dflag: 0 } });
        if (!existOrg) throw new AppError("Organisation not found", 404);
        const page = Math.max(1, query.page ?? 1);
        const limit = Math.min(100, Math.max(1, query.limit ?? 10));
        const search = query.search?.trim() ?? "";
        return this.issuePettyRepo.getAllIssuesPettty(orgCode, userCode, fromDate, toDate, page, limit, search);
    }

    async getIssuePettyByVoucherNumber(voucherNumber: string): Promise<any> {
        return this.issuePettyRepo.getIssuePettyByVoucherNumber(voucherNumber);
    }


}