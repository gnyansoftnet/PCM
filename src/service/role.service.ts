import { Repository } from "typeorm";
import { AppDataSource } from "../config/database";
import { Organisation } from "../entity/Orgnaisation";
import { Role } from "../entity/Role";
import { User } from "../entity/User";
import { AppError } from "../utils/app.error";

export class RoleService {
    private roleRepo: Repository<Role>;
    private orgRepo: Repository<Organisation>;
    private userRepo: Repository<User>;

    constructor() {
        this.roleRepo = AppDataSource.getRepository(Role);
        this.orgRepo = AppDataSource.getRepository(Organisation);
        this.userRepo = AppDataSource.getRepository(User);
    }

    async createRole(
        roleName: string,
        orgCode: string,
        createdBy: string,
    ): Promise<Role> {
        const org = await this.orgRepo.findOne({
            where: { Org_Code: orgCode },
        });
        if (org == null) {
            throw new AppError("Org not found", 404);
        }

        const user = await this.userRepo.findOne({
            where: { userCode: createdBy },
        });
        if (user == null) {
            throw new AppError("Created by not found", 404);
        }

        const role = await this.roleRepo.findOne({
            where: { roleName, dflag: false },
        });
        if (role) {
            throw new AppError("Role already exist", 401);
        }

        const newRole = this.roleRepo.create({
            roleName,
            orgCode,
            createdBy: user.userCode,
        });
        return await this.roleRepo.save(newRole);
    }

    async updateRole(
        roleId: number,
        modifiedBy: string,
        roleName?: string,
        orgCode?: string,
    ): Promise<Role> {
        const user = await this.userRepo.findOne({
            where: { userCode: modifiedBy, dflag: false },
        });
        if (user == null) {
            throw new AppError("Created by not found", 404);
        }

        const role = await this.roleRepo.findOne({
            where: { roleId, dflag: false },
        });
        if (!role) {
            throw new AppError("Role not found", 404);
        }

        if (roleName && roleName !== role.roleName) {
            const existingRole = await this.roleRepo.findOne({
                where: { dflag: false, roleName },
            });
            if (existingRole) {
                throw new AppError("Role already exist", 402);
            }
            role.roleName = roleName;
            role.modifiedBy = user.userCode;

            if (orgCode) {
                role.orgCode = orgCode;
            }
        }

        return await this.roleRepo.save(role);
    }

    async getRoleById(roleId: number): Promise<Role> {
        const role = await this.roleRepo.findOne({
            where: { roleId, dflag: false },
        });
        if (!role) {
            throw new AppError("Role not found", 404);
        }

        return role;
    }

    async getAllRoles(): Promise<Role[]> {
        return await this.roleRepo.find({
            where: { dflag: false },
            order: { roleId: "DESC" },
        });
    }

    async deleteRole(roleId: number): Promise<string> {
        const role = await this.roleRepo.findOne({
            where: { roleId, dflag: false },
        });
        if (role == null) {
            throw new AppError("Role not found", 404);
        }

        role.dflag = true;
        await this.roleRepo.save(role);
        return "Role deleted successfully";
    }

    async getRoleAccessService(
        Org_Code: string,
        roleId: number,
        action: string,
    ): Promise<any> {
        const result = await AppDataSource.query(
            `CALL USP_M_P_RoleAccess_DTL(?, ?, ?,?,?)`,
            [action, Org_Code, roleId, 0, 0]
        );

        return result;
    }
}