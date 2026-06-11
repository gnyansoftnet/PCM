import { AppDataSource } from "../config/database";
import { AppError } from "../utils/app.error";



const usp_SiteHeader = 'CALL usp_SiteHeader(?,?,?,?)';

export class UserRepository {

    async getSiteHeaders(orgCode: string, branchCode: string, userCode: string): Promise<any[]> {
        try {
            const data = await AppDataSource.query(
                usp_SiteHeader,
                ["SiteHeader", userCode, orgCode, branchCode]
            );
            return data[0][0] ?? {}
        } catch (error: any) {
            if (error instanceof AppError) throw error;
            throw new AppError(
                `[usp_SiteHeader] failed: ${error.message}`, 500
            );
        }

    }





}