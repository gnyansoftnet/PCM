import { AppDataSource } from "../config/database"
import { Organisation } from "../entity/Orgnaisation";
import { Role } from "../entity/Role"
import { User } from "../entity/User";
import { AppError } from "../utils/app.error";


const roleRepo = AppDataSource.getRepository(Role);
const orgRepo = AppDataSource.getRepository(Organisation);
const userRepo = AppDataSource.getRepository(User);


export const createRole = async (
    roleName: string,
    orgCode: string,
    createdBy: string,

): Promise<Role> => {

    const org = await orgRepo.findOne({
        where: {
            Org_Code: orgCode,
        }
    });


    if (org == null) {
        throw new AppError("Org not found", 404);
    }

    const user = await userRepo.findOne({
        where: {
            userCode: createdBy,
        }
    });


    if (user == null) {
        throw new AppError("Created by not found", 404);
    }
    const role = await roleRepo.findOne({
        where: {
            roleName: roleName,
            dflag: false,
        }
    })
    if (role) {
        throw new AppError("Role already exist", 401);
    }
    const newRole = roleRepo.create({
        roleName: roleName,
        orgCode: orgCode,
        createdBy: user.userCode
    });
    return await roleRepo.save(newRole);


}

export const updateRole = async (
    roleId: number,
    modifiedBy: string,
    roleName?: string,
    orgCode?: string,
): Promise<Role> => {

    const user = await userRepo.findOne({
        where: {
            userCode: modifiedBy,
            dflag: false,
        }
    });


    if (user == null) {
        throw new AppError("Created by not found", 404);
    }

    const role = await roleRepo.findOne({
        where: { roleId, dflag: false, }
    });

    if (!role) {
        throw new AppError("Role not found", 404);
    }
    if (roleName && roleName !== role.roleName) {

        const existingRole =
            await roleRepo.findOne({
                where: {
                    dflag: false,
                    roleName: roleName,
                }
            });

        if (existingRole) {
            throw new AppError("Role already exist", 402);
        }
        role.roleName = roleName;
        role.modifiedBy = user.userCode

        if (orgCode) {
            role.orgCode = orgCode;
        }

    }

    return await roleRepo.save(role);

}


export const getRoleById = async (
    roleId: number
): Promise<Role> => {

    const role = await roleRepo.findOne({
        where: {
            roleId,
            dflag: false
        }
    });

    if (!role) {
        throw new AppError("Role not found", 404);
    }

    return role;
};


export const getAllRoles = async (): Promise<Role[]> => {
    const roles = await roleRepo.find({
        where: {
            dflag: false
        },
        order: {
            roleId: "DESC"
        }
    });

    return roles;
};


export const deleteRole = async (
    roleId: number
): Promise<string> => {

    const role = await roleRepo.findOne({
        where: {
            roleId: roleId,
            dflag: false,
        }
    });

    if (role == null) {
        throw new AppError("Role not found", 404);
    }

    role.dflag = true;
    await roleRepo.save(role);
    return "Role deleted successfully";
};




export const getRoleAcesstService = async (
    Org_Code: string,
    roleId: number,
    action: string,

) => {

    const result = await AppDataSource.query(
        `CALL USP_M_P_RoleAccess_DTL(?, ?, ?,?,?)`,
        [action, Org_Code, roleId, 0, 0]
    );

    return result;
};
