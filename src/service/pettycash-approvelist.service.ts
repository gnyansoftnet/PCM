// services/pettycashapprovelist.service.ts

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
    private readonly pettyCashApproveListRepo: PettyCashApproveListRepository;
    constructor() {
        this.orgRepo = AppDataSource.getRepository(Organisation);
        this.userRepo = AppDataSource.getRepository(User);
        this.pettyCashApproveListRepo = new PettyCashApproveListRepository();
    }

    static async getPettyCashApproveList(data: any, query: PaginationQuery,) {
        const existOrg = await this.orgRepo.findOne({ where: { Org_Code: data.Org_Code, Dflag: 0 } });
        if (!existOrg) throw new AppError("Organisation not found", 404);
        const page = Math.max(1, query.page ?? 1);
        const limit = Math.min(100, Math.max(1, query.limit ?? 10));
        const search = query.search?.trim() ?? "";
        return this.pettyCashApproveListRepo.
    }



    static async updateStatus(data: any) {

        await AppDataSource.query(
            `CALL USP_T_STATUS_UPDATE_IUD(
                ?,?,?,?,?,?,?,@p_msg
            )`,
            [
                data.Action,
                data.Voucher_No,
                data.Decline_Reason || '',
                data.User_Code || '',
                data.Org_Code || '',
                data.Created_By,
                data.Fin_Year || ''
            ]
        );

        const msgResult: any = await AppDataSource.query(
            `SELECT @p_msg AS Message`
        );

        return {
            message: msgResult[0].Message
        };
    }
}