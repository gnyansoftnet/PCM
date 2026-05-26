import { Request, Response, NextFunction } from "express";
import { OrganisationService } from "../service/organisation.service";


const orgService = new OrganisationService();

export class OrganisationController {

    async getAllOrg(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const orgs = await orgService.getAllOrg();
            res.status(200).json({
                success: true,
                data: orgs,
            });
        } catch (error) {
            next(error);
        }
    }
}