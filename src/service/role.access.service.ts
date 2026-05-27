


import { AppDataSource } from "../config/database";

export const getNewRoleAccess = async (
    Org_Code: string
) => {

    const result = await AppDataSource.query(
        `CALL USP_M_P_RoleAccess_DTL(
      ?, ?, ?, ?, ?
    )`,
        [
            'NewRole',
            Org_Code,
            0,
            0,
            0
        ]
    );

    return result[0];
};

// =======================
// BY ROLE ID
// =======================
export const getRoleAccessByRoleId = async (
    Org_Code: string,
    Role_Id: number
) => {

    const result = await AppDataSource.query(
        `CALL USP_M_P_RoleAccess_DTL(
      ?, ?, ?, ?, ?
    )`,
        [
            'ByRoleId',
            Org_Code,
            Role_Id,
            0,
            0
        ]
    );

    return result[0];
};

// =======================
// MENU ACCESS
// =======================
export const getRoleMenuByRoleId = async (
    Org_Code: string,
    Role_Id: number
) => {

    const result = await AppDataSource.query(
        `CALL USP_M_P_RoleAccess_DTL(
      ?, ?, ?, ?, ?
    )`,
        [
            'ByRoleId_Menu',
            Org_Code,
            Role_Id,
            0,
            0
        ]
    );

    return result[0];
};

// =======================
// ALL ACCESS
// =======================
export const getRoleAccessAll = async (
    Org_Code: string,
    Role_Id: number
) => {

    const result = await AppDataSource.query(
        `CALL USP_M_P_RoleAccess_DTL(
      ?, ?, ?, ?, ?
    )`,
        [
            'ByRoleIdAll',
            Org_Code,
            Role_Id,
            0,
            0
        ]
    );

    return result[0];
};



export const saveRoleAccess = async (
    data: any
) => {

    const {
        User_Code,
        Role_Id,
        Org_Code,
        Created_By,
        Role_Access
    } = data;

    const result = await AppDataSource.query(
        `
        CALL USP_M_P_RoleAccess_IUD(
            ?, ?, ?, ?, ?, ?, ?
        )
        `,
        [
            'UPDATE',
            User_Code,
            Org_Code,
            Role_Id,
            0,
            Created_By,
            JSON.stringify(Role_Access)
        ]
    );

    return result[0];

};