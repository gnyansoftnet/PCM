import { ILike, Repository } from "typeorm";
import { ExpensesHead } from "../entity/ExpensesHead";
import { AppDataSource } from "../config/database";
import { AppError } from "../utils/app.error";
import { PaginationQuery } from "../dto/pagination.query.dto";
import { PaginatedResult } from "../dto/pagination.result.dto";
import { Organisation } from "../entity/Orgnaisation";
import { User } from "../entity/User";

export class ExpensesHeadService {
    private expensesHeadRepo: Repository<ExpensesHead>;
    private orgRepo: Repository<Organisation>;
    private userRepo: Repository<User>;

    constructor() {
        this.expensesHeadRepo = AppDataSource.getRepository(ExpensesHead);
        this.orgRepo = AppDataSource.getRepository(Organisation);
        this.userRepo = AppDataSource.getRepository(User);
    }

    async createExpensesHead(data: Partial<ExpensesHead>): Promise<ExpensesHead> {

        const existUser = await this.userRepo.findOne({
            where: { userCode: data.createdBy, dflag: false },
        });
        if (existUser == null) {
            throw new AppError("User Not Found", 404);
        }

        const existOrg = await this.orgRepo.findOne({
            where: { Org_Code: data.orgCode, Dflag: 0 },
        });
        if (existOrg == null) {
            throw new AppError("Organisation Not Found", 404);
        }

        const existing = await this.expensesHeadRepo.findOne({
            where: { headName: data.headName, dflag: false },
        });

        if (existing) {
            throw new AppError(`Expenses Head '${data.headName}' already exists.`, 402);
        }

        const expensesHead = this.expensesHeadRepo.create({
            headName: data.headName,
            orgCode: data.orgCode,
            createdBy: data.createdBy,
            dflag: false,
        });

        return await this.expensesHeadRepo.save(expensesHead);

    }



    async updateExpensesHead(headId: number, data: Partial<ExpensesHead>): Promise<ExpensesHead> {


        const existUser = await this.userRepo.findOne({
            where: { userCode: data.modifiedBy, dflag: false },
        });
        if (existUser == null) {
            throw new AppError("User Not Found", 404);
        }

        const existOrg = await this.orgRepo.findOne({
            where: { Org_Code: data.orgCode, Dflag: 0 },
        });
        if (existOrg == null) {
            throw new AppError("Organisation Not Found", 404);
        }
        const existing = await this.expensesHeadRepo.findOne({
            where: { headId, dflag: false },
        });

        if (!existing) {
            throw new AppError(`Expenses Head with ID ${headId} not found or deleted.`, 404);
        }

        const updated = this.expensesHeadRepo.merge(existing, {
            headName: data.headName,
            modifiedBy: data.modifiedBy,

        });
        return await this.expensesHeadRepo.save(updated);

    }



    async deleteExpensesHead(headId: number, modifiedBy: string): Promise<{ message: string }> {

        const existUser = await this.userRepo.findOne({
            where: { userCode: modifiedBy, dflag: false },
        });
        if (existUser == null) {
            throw new AppError("User Not Found", 404);
        }
        const existing = await this.expensesHeadRepo.findOne({
            where: { headId, dflag: false },
        });

        if (!existing) {
            throw new AppError(`Expenses Head with ID ${headId} not found or already deleted.`, 404);
        }

        existing.dflag = true;
        existing.modifiedBy = modifiedBy;
        await this.expensesHeadRepo.save(existing);

        return { message: `Expenses Head ${headId} deleted successfully.` };

    }



    async getExpensesHeadById(headId: number): Promise<ExpensesHead> {

        const expensesHead = await this.expensesHeadRepo.findOne({
            where: { headId, dflag: false },
        });

        if (!expensesHead) {
            throw new AppError(`Expenses Head with ID ${headId} not found.`, 404);
        }

        return expensesHead;

    }



    async getAllExpensesHeadsByOrgCode(
        orgCode: string,
        query: PaginationQuery,
    ): Promise<PaginatedResult<ExpensesHead>> {

        const existOrg = await this.orgRepo.findOne({ where: { Org_Code: orgCode, Dflag: 0 } });
        if (existOrg == null) throw new AppError("Organisation Not Found", 404);

        const page = Math.max(1, Number(query.page) || 1);
        const limit = Math.min(100, Math.max(1, Number(query.limit) || 10));
        const skip = (page - 1) * limit;
        const search = query.search?.trim() ?? "";

        const baseWhere = { orgCode, dflag: false as any };

        // Search across headName, applicableFor, defaultLimit
        const whereClause = search
            ? [
                { ...baseWhere, headName: ILike(`%${search}%`) },
                { ...baseWhere, applicableFor: ILike(`%${search}%`) },
                { ...baseWhere, defaultLimit: ILike(`%${search}%`) },
            ]
            : baseWhere;

        const [data, total] = await this.expensesHeadRepo.findAndCount({
            where: whereClause,
            order: { createdDate: "DESC" },
            skip,
            take: limit,
        });

        const totalPages = Math.ceil(total / limit);

        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1,
            },
        };
    }
}


