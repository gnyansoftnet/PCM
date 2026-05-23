import { Request, Response } from "express";
import {
    getNewRoleAccess,
    getRoleAccessByRoleId,
    getRoleMenuByRoleId,
    getRoleAccessAll
} from "../service/role.access.service";



export const newRoleAccess = async (
    req: Request,
    res: Response
) => {
    try {

        const { Org_Code } = req.body;

        const result = await getNewRoleAccess(
            Org_Code
        );

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (error: any) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


export const roleAccessByRoleId = async (
    req: Request,
    res: Response
) => {
    try {

        const {
            Org_Code,
            Role_Id
        } = req.body;

        const result = await getRoleAccessByRoleId(
            Org_Code,
            Role_Id
        );

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (error: any) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


export const roleMenuByRoleId = async (
    req: Request,
    res: Response
) => {
    try {

        const {
            Org_Code,
            Role_Id
        } = req.body;

        const result = await getRoleMenuByRoleId(
            Org_Code,
            Role_Id
        );

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (error: any) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// =======================
// ALL ROLE ACCESS
// =======================
export const roleAccessAll = async (
    req: Request,
    res: Response
) => {
    try {

        const {
            Org_Code,
            Role_Id
        } = req.body;

        const result = await getRoleAccessAll(
            Org_Code,
            Role_Id
        );

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (error: any) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};