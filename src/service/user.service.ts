import { UserRepository } from "../repository/user.repository";
import { comparePassword, hashPassword } from "../utils/bcrypt";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import { LoginRequestDto } from "../dto/login.request.dto";
import { LoginResponseDto } from "../dto/login.response.dto";
import { AppError } from "../utils/app.error";
import { AppDataSource } from "../config/database";
import { Token } from "../entity/Token";
import { UserResponseDto } from "../dto/user.response.dto";
import { CreateUserRequestDto } from "../dto/create-user.request.dto";
import { Role } from "../entity/Role";
import { User } from "../entity/User";
import { Organisation } from "../entity/Orgnaisation";
import { Branch } from "../entity/Branch";
import { Repository } from "typeorm";
import { generateUserCode } from "../utils/user.code.generation";

const userRepo = AppDataSource.getRepository(User);
const roleRepo = AppDataSource.getRepository(Role);
const orgRepo = AppDataSource.getRepository(Organisation);
const branchRepo = AppDataSource.getRepository(Branch);



export class UserService {
    private orgRepo: Repository<Organisation>;
    private userRepo: Repository<User>;
    constructor() {
        this.orgRepo = AppDataSource.getRepository(Organisation);
        this.userRepo = AppDataSource.getRepository(User);
    }

    async loginUser(body: LoginRequestDto): Promise<LoginResponseDto> {
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
            name: user.name,
            orgCode: user.orgCode,
            userCode: user.userCode,
            branchCode: user.branchCode,

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

    async createUser(body: CreateUserRequestDto): Promise<UserResponseDto> {

        const existingUser = await userRepo.findOne({
            where: {
                name: body.name
            }
        });
        if (existingUser) {
            throw new AppError("Username already exists", 401);
        }

        const existRole = await roleRepo.findOne({
            where: {
                roleId: body.userType
            }
        })

        if (existRole == null) {
            throw new AppError("User type not found", 402);
        }


        const existOrg = await orgRepo.findOne({
            where: {
                Org_Code: body.orgCode
            }
        })

        if (existOrg == null) {
            throw new AppError("organisation not found", 402);
        }


        const existBranch = await branchRepo.findOne({
            where: {
                Branch_Code: body.branchCode
            }
        })

        if (existBranch == null) {
            throw new AppError("Branch not found", 402);
        }


        const hashedPassword = await hashPassword(
            body.password
        );
        const userCode = await generateUserCode(existOrg.Org_Code);


        const user = userRepo.create({
            roleId: body.userType,
            userCode: userCode,
            name: body.name,
            fullName: body.fullName,
            password: hashedPassword,
            orgCode: body.orgCode,
            branchCode: body.branchCode,
            mobile: body.mobile,
            email: body.email,

        });

        const savedUser = await userRepo.save(user);

        return {
            userId: savedUser.userId,
            userCode: savedUser.userCode,
            name: savedUser.name,
            fullName: savedUser.fullName,
            email: savedUser.email,
            mobile: savedUser.mobile,
            status: savedUser.status,
            orgCode: savedUser.orgCode,
            branchCode: savedUser.branchCode,
            createDate: savedUser.createDate,
            modifiedDate: savedUser.modifiedDate,
            roleId: savedUser.roleId!,
        };


    }

    async updateUser(
        userId: number,
        body: CreateUserRequestDto
    ): Promise<UserResponseDto> {
        const user = await userRepo.findOne({
            where: { userId }
        });

        if (!user) {
            throw new AppError("User not found", 404);
        }

        const existingUser = await userRepo.findOne({
            where: {
                name: body.name
            }
        });

        if (existingUser && existingUser.userId !== userId) {
            throw new AppError("Username already exists", 401);
        }

        const existRole = await roleRepo.findOne({
            where: {
                roleId: body.userType
            }
        });

        if (!existRole) {
            throw new AppError("User type not found", 402);
        }

        const existOrg = await orgRepo.findOne({
            where: {
                Org_Code: body.orgCode
            }
        });

        if (!existOrg) {
            throw new AppError("Organisation not found", 402);
        }

        const existBranch = await branchRepo.findOne({
            where: {
                Branch_Code: body.branchCode
            }
        });

        if (!existBranch) {
            throw new AppError("Branch not found", 402);
        }

        user.roleId = body.userType;
        user.name = body.name;
        user.fullName = body.fullName;
        user.orgCode = body.orgCode;
        user.branchCode = body.branchCode;
        user.mobile = body.mobile;
        user.email = body.email;

        // update password only if provided
        if (body.password) {
            user.password = await hashPassword(body.password);
        }

        const updatedUser = await userRepo.save(user);

        return {
            userId: updatedUser.userId,
            userCode: updatedUser.userCode,
            name: updatedUser.name,
            fullName: updatedUser.fullName,
            email: updatedUser.email,
            mobile: updatedUser.mobile,
            status: updatedUser.status,
            orgCode: updatedUser.orgCode,
            branchCode: updatedUser.branchCode,
            createDate: updatedUser.createDate,
            modifiedDate: updatedUser.modifiedDate,
            roleId: updatedUser.roleId!,
        };

    }

    async getUsersByOrgCode(orgCode: string) {
        return await userRepo.find({
            where: {
                orgCode: orgCode,
                dflag: false,
            }
        });

    }
    async getUsersById(userId: number) {
        return await userRepo.find({
            where: {
                userId: userId,
                dflag: false,
            }
        });

    }

    async deleteUser(userId: number): Promise<string> {
        const user = await userRepo.findOne({
            where: {
                userId,
            }
        });

        if (user == null) {
            throw new AppError("User not found", 404);
        }

        user.dflag = true;
        await roleRepo.save(user);
        return "User deleted successfully";
    }


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















