
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
import { ILike, Repository } from "typeorm";
import { generateUserCode } from "../utils/user.code.generation";
import { UserStatus } from "../enums/user.status.enum";
import { PaginationQuery } from "../dto/pagination.query.dto";
import { PaginatedResult } from "../dto/pagination.result.dto";
import { UserRepository } from "../repository/user.repository";






export class UserService {
    private orgRepo: Repository<Organisation>;
    private roleRepo: Repository<Role>;
    private userRepo: Repository<User>;
    private branchRepo: Repository<Branch>;
    private readonly userRepository: UserRepository;
    constructor() {
        this.orgRepo = AppDataSource.getRepository(Organisation);
        this.userRepo = AppDataSource.getRepository(User);
        this.branchRepo = AppDataSource.getRepository(Branch);
        this.roleRepo = AppDataSource.getRepository(Role);
        this.userRepository = new UserRepository();
    }

    async loginUser(body: LoginRequestDto): Promise<LoginResponseDto> {
        const user = await this.userRepo.findOne({
            where: {
                name: body.name,
                dflag: false,
                status: UserStatus.Active
            }
        });

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
            roleId: user.roleId,

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

        const existingUser = await this.userRepo.findOne({
            where: {
                name: body.name,
                dflag: false,
            }
        });
        if (existingUser) {
            throw new AppError("Username already exists", 401);
        }

        const existRole = await this.roleRepo.findOne({
            where: {
                roleId: body.userType,
                dflag: false,

            }
        })

        if (existRole == null) {
            throw new AppError("User type not found", 402);
        }


        const existOrg = await this.orgRepo.findOne({
            where: {
                Org_Code: body.orgCode,
                Dflag: 0,

            }
        })

        if (existOrg == null) {
            throw new AppError("organisation not found", 402);
        }


        const existBranch = await this.branchRepo.findOne({
            where: {
                Branch_Code: body.branchCode,
                Dflag: false,

            }
        })

        if (existBranch == null) {
            throw new AppError("Branch not found", 402);
        }


        const hashedPassword = await hashPassword(
            body.password
        );
        const userCode = await generateUserCode(existOrg.Org_ShortName);


        const user = this.userRepo.create({
            roleId: body.userType,
            userCode: userCode,
            name: body.name,
            fullName: body.fullName,
            password: hashedPassword,
            orgCode: body.orgCode,
            branchCode: body.branchCode,
            mobile: body.mobile,
            email: body.email,
            status: body.status,
            createdBy: body.createdBy,

        });

        const savedUser = await this.userRepo.save(user);

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
        const user = await this.userRepo.findOne({
            where: { userId: userId, dflag: false, }
        });

        if (!user) {
            throw new AppError("User not found", 404);
        }

        const existingUser = await this.userRepo.findOne({
            where: {
                name: body.name
            }
        });

        if (existingUser && existingUser.userId !== userId) {
            throw new AppError("Username already exists", 401);
        }

        const existRole = await this.roleRepo.findOne({
            where: {
                roleId: body.userType
            }
        });

        if (!existRole) {
            throw new AppError("User type not found", 402);
        }

        const existOrg = await this.orgRepo.findOne({
            where: {
                Org_Code: body.orgCode
            }
        });

        if (!existOrg) {
            throw new AppError("Organisation not found", 402);
        }

        const existBranch = await this.branchRepo.findOne({
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
        user.modifiedBy = body.modifiedBy;
        user.status = body.status;
        // update password only if provided
        // if (body.password) {
        //     user.password = await hashPassword(body.password);
        // }

        const updatedUser = await this.userRepo.save(user);

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

    async getUsersByOrgCode(
        orgCode: string,
        query: PaginationQuery
    ): Promise<PaginatedResult<User>> {

        const page = Math.max(1, Number(query.page) || 1);
        const limit = Math.max(1, Number(query.limit) || 10);
        const skip = (page - 1) * limit;
        const search = query.search?.trim() ?? "";

        const whereClause = search
            ? [
                {
                    orgCode,
                    dflag: false,
                    userName: ILike(`%${search}%`)
                },
                {
                    orgCode,
                    dflag: false,
                    userCode: ILike(`%${search}%`)
                }
            ]
            : {
                orgCode,
                dflag: false
            };

        const [data, total] = await this.userRepo.findAndCount({
            where: whereClause,
            skip,
            take: limit,
            order: {
                createDate: "DESC"
            }
        });

        const totalPages = Math.ceil(total / limit);

        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1,
            },
        };
    }
    async getUsersById(userId: number) {
        return await this.userRepo.find({
            where: {
                userId: userId,
                dflag: false,
            }
        });

    }

    async deleteUser(userId: number): Promise<string> {
        const user = await this.userRepo.findOne({
            where: {
                userId,
                dflag: false,
            }
        });

        if (user == null) {
            throw new AppError("User not found", 404);
        }

        user.dflag = true;
        await this.userRepo.save(user);
        return "User deleted successfully";
    }


    async siteheaders(orgCode: string, branchCode: string, userCode: string): Promise<any> {
        const existOrg = await this.orgRepo.findOne({
            where: {
                Org_Code: orgCode
            }
        });

        if (!existOrg) {
            throw new AppError("Organisation not found", 402);
        }

        const existBranch = await this.branchRepo.findOne({
            where: {
                Branch_Code: branchCode
            }
        });

        if (!existBranch) {
            throw new AppError("Branch not found", 402);
        }
        const existuser = await this.userRepo.findOne({
            where: {
                userCode: userCode
            }
        });

        if (!existuser) {
            throw new AppError("Branch not found", 402);
        }
        return this.userRepository.getSiteHeaders(orgCode, branchCode, userCode);


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















