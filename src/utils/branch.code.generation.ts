import { AppDataSource } from "../config/database";
import { Branch } from "../entity/Branch";

export const generateBranchCode = async (): Promise<string> => {

    const branchRepo =
        AppDataSource.getRepository(Branch);

    // get latest user
    const lastBranch = await branchRepo
        .createQueryBuilder("branch")
        .orderBy("branch.Id", "DESC")
        .getOne();

    // first user
    if (!lastBranch) {
        return "BRA001";
    }

    // extract number
    const lastCodeNumber = parseInt(
        lastBranch.Org_Code.replace("BRA", "")
    );

    // increment
    const newCodeNumber = lastCodeNumber + 1;

    // format
    return `BRA${String(newCodeNumber).padStart(3, "0")}`;
};
