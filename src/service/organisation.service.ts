// import { AppDataSource } from "../config/database";
// import { Organisation } from "../entity/Orgnaisation";

import { Repository } from "typeorm";
import { Vehicle } from "../entity/Vehicle";
import { Organisation } from "../entity/Orgnaisation";
import { AppDataSource } from "../config/database";

// export const generateOrgCode = async (): Promise<string> => {

//     const orgRepo =
//         AppDataSource.getRepository(Organisation);

//     // get latest user
//     const lastOrg = await orgRepo
//         .createQueryBuilder("organisation")
//         .orderBy("organisation.Id", "DESC")
//         .getOne();

//     // first user
//     if (!lastOrg) {
//         return "ORG001";
//     }

//     // extract number
//     const lastCodeNumber = parseInt(
//         lastOrg.Org_Code.replace("ORG", "")
//     );

//     // increment
//     const newCodeNumber = lastCodeNumber + 1;

//     // format
//     return `ORG${String(newCodeNumber).padStart(3, "0")}`;
// };


export class OrganisationService {
    private orgRepo: Repository<Organisation>;

    constructor() {
        this.orgRepo = AppDataSource.getRepository(Organisation);
    }

    async getAllOrg(): Promise<Organisation[]> {
        const orgs = this.orgRepo.find();
        return orgs;

    }

}