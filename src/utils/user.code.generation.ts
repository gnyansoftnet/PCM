import { AppDataSource } from "../config/database";
import { User } from "../entity/User";

export const generateUserCode = async (orgCode: string): Promise<string> => {

    const userRepo = AppDataSource.getRepository(User);

    // Get latest user for this org
    const lastUser = await userRepo
        .createQueryBuilder("user")
        .where("user.userCode LIKE :code", {
            code: `${orgCode}%`,
        })
        .orderBy("user.userId", "DESC")
        .getOne();

    // First user
    if (!lastUser) {
        return `${orgCode}0001`;
    }

    // Extract numeric part
    const lastCodeNumber = parseInt(
        lastUser.userCode.replace(orgCode, "")
    );

    // Increment number
    const newCodeNumber = lastCodeNumber + 1;

    // Return formatted code
    return `${orgCode}${String(newCodeNumber).padStart(4, "0")}`;
};