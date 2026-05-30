import { Repository } from "typeorm";
import { Party } from "../entity/Party";
import { AppDataSource } from "../config/database";
import { AppError } from "../utils/app.error";

export class PartyService {

    private partyRepo: Repository<Party>;

    constructor() {
        this.partyRepo = AppDataSource.getRepository(Party);
    }

    /* ---------------- CREATE ---------------- */

    async createParty(data: Partial<Party>): Promise<Party> {

        if (!data.Party_Name?.trim()) {
            throw new AppError("Party Name Required", 400);
        }

        if (!data.Party_GSTIN?.trim()) {
            throw new AppError("GSTIN Required", 400);
        }

        if (!data.Phone_No?.trim()) {
            throw new AppError("Phone Number Required", 400);
        }

        // const duplicateParty = await this.partyRepo.findOne({
        //     where: [
        //         { Party_Name: data.Party_Name, Dflag: 0 },
        //         { Party_GSTIN: data.Party_GSTIN, Dflag: 0 },
        //         { Phone_No: data.Phone_No, Dflag: 0 },
        //         { SAPERP_Code: data.SAPERP_Code, Dflag: 0 }
        //     ]
        // });

        // if (duplicateParty) {
        //     throw new AppError("Party Already Exists", 400);
        // }

const nameExists = await this.partyRepo
    .createQueryBuilder("party")
    .where("LOWER(party.Party_Name) = LOWER(:name)", {
        name: data.Party_Name
    })
    .andWhere("party.Dflag = 0")
    .getOne();

if (nameExists) {
    throw new AppError("Party Name Already Exists", 400);
}

        /* -------- GENERATE PARTY CODE -------- */

        const lastParty = await this.partyRepo.find({
            order: { Party_Id: "DESC" },
            take: 1
        });

        let newCode = "PR/0001";

        if (lastParty.length > 0) {

            const lastCode = lastParty[0].Party_Code;

            const num = parseInt(lastCode.split("/")[1]);

            newCode = `PR/${(num + 1)
                .toString()
                .padStart(4, "0")}`;
        }

        const party = this.partyRepo.create({
            ...data,
            Party_Code: newCode,
            Dflag: 0
        });

        return await this.partyRepo.save(party);
    }

    /* ---------------- GET LIST ---------------- */

    // async getPartyList(): Promise<Party[]> {

    //     return await this.partyRepo.find({
    //         where: { Dflag: 0 },
    //         order: { Party_Id: "DESC" }
    //     });
    // }

async getPartyList() {
    return await this.partyRepo
        .createQueryBuilder("p")
        .leftJoin(
            "tbl_01_m_route",
            "r",
            "r.Route_Id = p.Route_Id"
        )
        .select([
            "p.Party_Id AS Party_Id",
            "p.Party_Code AS Party_Code",
            "p.Party_Name AS Party_Name",
            "p.Party_Address AS Party_Address",
            "p.Party_GSTIN AS Party_GSTIN",
            "p.Contact_Person AS Contact_Person",
            "p.Phone_No AS Phone_No",
            "p.Email AS Email",
            "p.SAPERP_Code AS SAPERP_Code",
            "r.Route_Name AS Route",
            "p.Route_Id AS Route_Id",
            "p.Fin_Year AS Fin_Year",
            "p.Org_Code AS Org_Code",
            "p.Created_By AS Created_By",
            "p.Created_Date AS Created_Date",
            "p.Modified_By AS Modified_By",
            "p.Modified_Date AS Modified_Date",
            "p.Dflag AS Dflag"
        ])
        .where("p.Dflag = :dflag", { dflag: 0 })
        .orderBy("p.Party_Id", "DESC")
        .getRawMany();
}
    
    /* ---------------- GET BY ID ---------------- */

    async getPartyById(id: number): Promise<Party> {

        const party = await this.partyRepo.findOne({
            where: {
                Party_Id: id,
                Dflag: 0
            }
        });

        if (!party) {
            throw new AppError("Party Not Found", 404);
        }

        return party;
    }

    /* ---------------- UPDATE ---------------- */

    async updateParty(
        id: number,
        data: Partial<Party>
    ): Promise<Party> {

        const existingParty = await this.getPartyById(id);

        // const duplicate = await this.partyRepo.findOne({
        //     where: [
        //         {
        //             Party_GSTIN: data.Party_GSTIN,
        //             Dflag: 0
        //         },
        //         {
        //             Phone_No: data.Phone_No,
        //             Dflag: 0
        //         }
        //     ]
        // });

        // if (
        //     duplicate &&
        //     duplicate.Party_Id !== id
        // ) {
        //     throw new AppError(
        //         "Duplicate GSTIN or Phone Number",
        //         400
        //     );
        // }

        const updatedParty = this.partyRepo.merge(
            existingParty,
            {
                ...data
            }
        );

        return await this.partyRepo.save(updatedParty);
    }

    /* ---------------- DELETE ---------------- */

    async deleteParty(id: number): Promise<{ message: string }> {

        const party = await this.getPartyById(id);

        party.Dflag = 1;

        await this.partyRepo.save(party);

        return {
            message: "Party Deleted Successfully"
        };
    }
}