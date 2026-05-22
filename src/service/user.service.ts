import { UserRepository } from "../repository/user.repository";
import { comparePassword, hashPassword } from "../utils/bcrypt";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import { LoginRequestDto } from "../dto/login.request.dto";
import { LoginResponseDto } from "../dto/login.response.dto";
import { AppError } from "../utils/app.error";
import { AppDataSource } from "../config/database";
import { Token } from "../entity/Token";


export const loginUser = async (
    body: LoginRequestDto
): Promise<LoginResponseDto> => {


    const user = await UserRepository.findByName(body.name);

    if (user == null) {
        throw new AppError("Incorrect username or password", 401);
    }
    const isMatch = await comparePassword(body.password, user.password);
    if (!isMatch) {
        throw new AppError("Incorrect username or password", 401);
    }
    const payload = {
        userId: user.userId,
        name: user.name
    };
    const accessToken = generateAccessToken(payload);

    const refreshToken = generateRefreshToken(payload);

    const tokenRepo =
        AppDataSource.getRepository(Token);

    await tokenRepo.save({
        token: refreshToken,
        user: user
    });

    return {
        "accessToken": accessToken,
        "refreshToken": refreshToken,
        user: toUserDto(user)
    };;
}




export const toUserDto = (user: any) => ({
    roleId: user.roleId,
    userId: user.userId,
    userCode: user.userCode,
    name: user.name,
    fullName: user.fullName,
    email: user.email,
    mobile: user.mobile,
    status: user.status,
    orgCode: user.orgCode,
    branchCode: user.branchCode,
    createDate: user.createDate,
    modifiedDate: user.modifiedDate,

});













