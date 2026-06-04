import { Repository } from "typeorm";
import { Organisation } from "../entity/Orgnaisation";
import { User } from "../entity/User";
import { AppDataSource } from "../config/database";
import { TripSettelmentRequest } from "../dto/trip-settelment-request.dt";
import { AppError } from "../utils/app.error";
import { TripSettelmentRepository } from "../repository/trip-settelment.repository";
import { PaginatedResult } from "../dto/pagination.result.dto";
import { PaginationQuery } from "../dto/pagination.query.dto";

export class TripSettelmentService {
    private readonly orgRepo: Repository<Organisation>;
    private readonly userRepo: Repository<User>;
    private readonly tripSettelmentRepo: TripSettelmentRepository;
    constructor() {
        this.orgRepo = AppDataSource.getRepository(Organisation);
        this.userRepo = AppDataSource.getRepository(User);
        this.tripSettelmentRepo = new TripSettelmentRepository();
    }






    async saveUpdateDeleteTripSettelment(
        request: TripSettelmentRequest
    ): Promise<string> {
        const existOrg = await this.orgRepo.findOne({
            where: {
                Org_Code: request.Org_Code,
                Dflag: 0,
            }
        });
        if (existOrg == null) {
            throw new AppError("Organisation not found", 404);
        }
        const existuser = await this.userRepo.findOne({
            where: {
                userCode: request.Created_By,
                dflag: false,
            }
        });
        if (existuser == null) {
            throw new AppError("Created by not found", 404);
        }
        request.Fin_Year = `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`;
        const result = this.tripSettelmentRepo.saveUpdateDeleteTripSettelment(
            request
        );
        return result;

    }




    async getAllTripSettlement(
        orgCode: string,
        userCode: string,
        fromDate: string,
        toDate: string,
        query: PaginationQuery,
    ): Promise<PaginatedResult<any>> {

        const existOrg = await this.orgRepo.findOne({ where: { Org_Code: orgCode, Dflag: 0 } });
        if (!existOrg) throw new AppError("Organisation not found", 404);
        const page = Math.max(1, query.page ?? 1);
        const limit = Math.min(100, Math.max(1, query.limit ?? 10));
        const search = query.search?.trim() ?? "";
        return this.tripSettelmentRepo.getAllTripSettlement(orgCode, userCode, fromDate, toDate, page, limit, search);
    }
    async getPendingTripSettlement(
        orgCode: string,
        userCode: string,
        query: PaginationQuery,
    ): Promise<PaginatedResult<any>> {
        const existOrg = await this.orgRepo.findOne({ where: { Org_Code: orgCode, Dflag: 0 } });
        if (!existOrg) throw new AppError("Organisation not found", 404);
        const page = Math.max(1, query.page ?? 1);
        const limit = Math.min(100, Math.max(1, query.limit ?? 10));
        return this.tripSettelmentRepo.getPendingTripSettlement(orgCode, userCode, page, limit);
    }

    async getTripSettelmentByVoucherNumber(voucherNumber: string): Promise<any> {
        return this.tripSettelmentRepo.getTripSettelmentVoucherNumber(voucherNumber);
    }
    async getTripSettelmentPrintByVoucherNumber(voucherNumber: string): Promise<any> {
        return this.tripSettelmentRepo.getTripSettelmentPrintByVoucherNumber(voucherNumber);
    }


}