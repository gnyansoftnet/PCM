import { Repository } from "typeorm";
import { AppDataSource } from "../config/database";
import { Organisation } from "../entity/Orgnaisation";
import { PettyCashApproveListRepository } from "../repository/pettycash-approvelist.repository";
import { User } from "../entity/User";
import { PaginationQuery } from "../dto/pagination.query.dto";
import { AppError } from "../utils/app.error";

export class PettyCashApproveListService {
    private readonly orgRepo: Repository<Organisation>;
    private readonly userRepo: Repository<User>;
    private readonly pettyCashApproveRepo: PettyCashApproveListRepository;
    constructor() {
        this.orgRepo = AppDataSource.getRepository(Organisation);
        this.userRepo = AppDataSource.getRepository(User);
        this.pettyCashApproveRepo = new PettyCashApproveListRepository();
    }

    async getPettyCashApproveList(data: any, query: PaginationQuery,) {
        const existOrg = await this.orgRepo.findOne({ where: { Org_Code: data.Org_Code, Dflag: 0 } });
        if (!existOrg) throw new AppError("Organisation not found", 404);
        const existUser = await this.userRepo.findOne({ where: { userCode: data.User_Code, dflag: false } });
        if (!existUser) throw new AppError("User not found", 404);
        const page = Math.max(1, query.page ?? 1);
        const limit = Math.max(1, Number(query.limit) || 10);
        const search = query.search?.trim() ?? "";
        return this.pettyCashApproveRepo.getPettyCashApproveList(data, page, limit, search);
    }



    async updateStatus(data: any) {
        return this.pettyCashApproveRepo.updateStatus(data);

    }
}