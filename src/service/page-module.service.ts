import { Repository } from "typeorm";
import { PageModule } from "../entity/PageModule";
import { AppDataSource } from "../config/database";
import { PageModuleResponseDto } from "../dto/page-module-response.dto";

export class PageModuleService {
    private pageModuleRepo: Repository<PageModule>

    constructor() {
        this.pageModuleRepo = AppDataSource.getRepository(PageModule);
    }

    async getAllPageModule(): Promise<PageModuleResponseDto[]> {
        const pageModules = await this.pageModuleRepo.find();
        return pageModules.map((pageModule) => ({
            mgId: pageModule.mgId,
            mName: pageModule.mName,
        }));
    }
}