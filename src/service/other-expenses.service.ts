import { Repository } from "typeorm";
import { OperationAction } from "../enums/operation-action.enum";
import { Organisation } from "../entity/Orgnaisation";
import { AppDataSource } from "../config/database";
import { AppError } from "../utils/app.error";
import { User } from "../entity/User";
import { PaginatedResult } from "../dto/pagination.result.dto";
import { PaginationQuery } from "../dto/pagination.query.dto";
import { OtherExpensesRepository } from "../repository/other-expenses.repository";
import { OtherExpensesResponseDto } from "../dto/other-expenses-responses.dto";

export class OtherExpensesService {
    private readonly orgRepo: Repository<Organisation>;
    private readonly userRepo: Repository<User>;
    private readonly otherExpensesRepo: OtherExpensesRepository;
    constructor() {
        this.orgRepo = AppDataSource.getRepository(Organisation);
        this.userRepo = AppDataSource.getRepository(User);
        this.otherExpensesRepo = new OtherExpensesRepository();
    }

    async saveUpdateDeleteOtherExpenses(
        action: OperationAction,
        id: number,
        expensesAmount: number,
        expDate: string,
        expensesName: string,
        expCode: string,
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
                userCode: createdBy,
                dflag: false,
            }
        });
        if (existuser == null) {
            throw new AppError("Created by not found", 404);
        }

        const currentYear = new Date().getFullYear();
        const finYear = `${currentYear}-${currentYear + 1}`;
        const result = this.otherExpensesRepo.saveUpdateDeleteOtherExpenses(
            action, id, expensesAmount, expDate, expensesName, expCode, orgCode, createdBy, finYear
        )
        return result;

    }


    async getAllOtherExpensesByOrg(
        orgCode: string,
        query: PaginationQuery,
    ): Promise<PaginatedResult<OtherExpensesResponseDto>> {

        const existOrg = await this.orgRepo.findOne({ where: { Org_Code: orgCode, Dflag: 0 } });
        if (!existOrg) throw new AppError("Organisation not found", 404);
        const page = Math.max(1, query.page ?? 1);
        const limit = Math.min(100, Math.max(1, query.limit ?? 10));
        const search = query.search?.trim() ?? "";
        return this.otherExpensesRepo.getAllOtherExpensesByOrg(orgCode, page, limit, search);
    }

    async getOtherExpensesDetailsById(id: number): Promise<OtherExpensesResponseDto> {
        return this.otherExpensesRepo.getOtherExpensesDetailsById(id);
    }


}