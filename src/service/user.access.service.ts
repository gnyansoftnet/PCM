

// =======================
// SAVE USER ACCESS
// =======================

import { AppDataSource } from "../config/database";


export const saveUserAccess = async (
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
        `CALL USP_M_P_UserAccess_IUD(
            ?, ?, ?, ?, ?, ?, ?
        )`,
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


export const getUserAccessByUserRole = async (
    Org_Code: string,
    User_Code: string,
    Role_Id: number,
    M_Id: number
) => {

    const result = await AppDataSource.query(
        `CALL USP_M_P_UserAccess_DTL(
            ?, ?, ?, ?, ?, ?
        )`,
        [
            'By_UserCode_RoleId',
            Org_Code,
            User_Code,
            Role_Id,
            M_Id,
            0
        ]
    );

    return result[0];

};

// ========================================
// MENU ACCESS
// ========================================

export const getUserMenuAccess = async (
    Org_Code: string,
    User_Code: string,
    Role_Id: number
) => {

    const result = await AppDataSource.query(
        `CALL USP_M_P_UserAccess_DTL(
            ?, ?, ?, ?, ?, ?
        )`,
        [
            'ByRoleId_Menu',
            Org_Code,
            User_Code,
            Role_Id,
            0,
            0
        ]
    );

    return result[0];

};