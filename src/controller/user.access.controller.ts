import { Request, Response } from "express";

import {
    saveUserAccess,
    getUserAccessByUserRole,
    getUserMenuAccess
} from "../service/user.access.service";

// =======================
// SAVE USER ACCESS
// =======================

export const saveUserAccessData = async (
    req: Request,
    res: Response
) => {

    try {

        const {
            User_Code,
            Role_Id,
            Org_Code,
            Created_By,
            Role_Access
        } = req.body;

        // VALIDATION

        if (!User_Code) {

            return res.status(400).json({
                success: false,
                message: "User Code Required"
            });

        }

        if (!Role_Id) {

            return res.status(400).json({
                success: false,
                message: "Role Id Required"
            });

        }

        if (!Org_Code) {

            return res.status(400).json({
                success: false,
                message: "Org Code Required"
            });

        }

        const result = await saveUserAccess(
            req.body
        );

        return res.status(200).json({
            success: true,
            message: "User Access Saved Successfully",
            data: result
        });

    }
    catch (error: any) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ========================================
// BY USER CODE ROLE ID
// ========================================

export const userAccessByUserRole = async (
    req: Request,
    res: Response
) => {

    try {

        const {
            Org_Code,
            User_Code,
            Role_Id,
            M_Id
        } = req.body;

        const result =
            await getUserAccessByUserRole(
                Org_Code,
                User_Code,
                Role_Id,
                M_Id
            );

        return res.status(200).json({
            success: true,
            data: result
        });

    }
    catch (error: any) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ========================================
// MENU ACCESS
// ========================================

export const userMenuAccess = async (
    req: Request,
    res: Response
) => {

    try {

        const {
            Org_Code,
            User_Code,
            Role_Id
        } = req.body;

        const result =
            await getUserMenuAccess(
                Org_Code,
                User_Code,
                Role_Id
            );

        return res.status(200).json({
            success: true,
            data: result
        });

    }
    catch (error: any) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
