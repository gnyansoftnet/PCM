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

export class CashInFlowService {
    private readonly orgRepo: Repository<Organisation>;
    private readonly userRepo: Repository<User>;
    private readonly cashInFlowRepo: CashInflowRepository;
    constructor() {
        this.orgRepo = AppDataSource.getRepository(Organisation);
        this.userRepo = AppDataSource.getRepository(User);
        this.cashInFlowRepo = new CashInflowRepository();
    }

    async saveUpdateDeleteCashInflow(
        action: OperationAction,
        cifId: number,
        amount: number,
        date: string,
        remark: string,
        type: string,
        cifCode: string,
        orgCode: string,
        createdBy: string,
    ): Promise<string> {
        const existOrg = await this.orgRepo.findOne({
            where: {
                Org_Code: orgCode,
                Dflag: 0,
            }
        });
        if (existOrg == null) {
            throw new AppError("Organisation not found", 404);
        }
        const existuser = await this.userRepo.findOne({
            where: {
                userCode: orgCode,
                dflag: false,
            }
        });
        if (existuser == null) {
            throw new AppError("Created by not found", 404);
        }

        const currentYear = new Date().getFullYear();
        const finYear = `${currentYear}-${currentYear + 1}`;
        const result = this.cashInFlowRepo.saveUpdateDeleteCashInflow(
            action, cifId, amount, date, remark, type, cifCode, orgCode, createdBy, finYear
        )
        return result;

    }


    async getAllCashInflowByOrg(
        orgCode: string,
        query: PaginationQuery,
    ): Promise<PaginatedResult<CashInflowResponseDto>> {

        const existOrg = await this.orgRepo.findOne({ where: { Org_Code: orgCode, Dflag: 0 } });
        if (!existOrg) throw new AppError("Organisation not found", 404);

        const page = Math.max(1, query.page ?? 1);
        const limit = Math.min(100, Math.max(1, query.limit ?? 10));
        const search = query.search?.trim() ?? "";
        return this.cashInFlowRepo.getAllCashInflowByOrg(orgCode, page, limit, search);
    }

    async getCashInflowDetailsByCifId(cifId: number): Promise<CashInflowResponseDto> {
        return this.cashInFlowRepo.getCashInflowDetailsByCifId(cifId);
    }


}