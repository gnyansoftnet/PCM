import { Request, Response, NextFunction } from "express";
import { body, param, validationResult } from "express-validator";

import {
    createRole,
    updateRole,
    getRoleById,
    getAllRoles,
    deleteRole,
    getRoleAcesstService
} from "../service/role.service";
import { assertValid } from "../utils/assert_valid";
import { parseId } from "../utils/parse_id";



export const validateCreateRole = [
    body("roleName")
        .trim()
        .notEmpty().withMessage("roleName is required")
        .isLength({ min: 2, max: 50 }).withMessage("roleName must be 2–50 characters"),
    body("orgCode")
        .trim()
        .notEmpty().withMessage("orgCode is required"),
];

export const validateUpdateRole = [
    body("createdBy")
        .trim()
        .notEmpty().withMessage("createdBy need"),
    body("roleId")
        .trim()
        .notEmpty().withMessage("roleId is required"),
    body("roleName")
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 }).withMessage("roleName must be 2–50 characters"),
];

export const createRoleController = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        assertValid(req);
        const { roleName, orgCode, createdBy } = req.body;
        const data = await createRole(roleName, orgCode, createdBy);
        res.status(201).json({ success: true, message: "Role created successfully", data });
    } catch (error) {
        next(error);
    }
};

export const updateRoleController = async (
    req: Request,
    res: Response,
    next: NextFunction,

): Promise<void> => {
    try {

        assertValid(req);
        const body: {
            roleId: number;
            modifiedBy: string;
            roleName?: string;
            orgCode?: string;
        } = req.body;


        const data = await updateRole(body.roleId, body.modifiedBy, body.roleName, body.orgCode);

        res.status(200).json({
            success: true,
            message: "Role updated successfully",
            data
        });

    } catch (error) {
        next(error);
    }
};

export const getRoleByIdController = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const roleId = parseId(req.params.roleId, next);
        if (!roleId) return;
        const data = await getRoleById(roleId);
        res.status(200).json({ success: true, data });
    } catch (error) {
        next(error);
    }
};

export const getAllRolesController = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const data = await getAllRoles();
        res.status(200).json({ success: true, data });
    } catch (error) {
        next(error);
    }
};

export const deleteRoleController = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const roleId = parseId(req.params.roleId, next);
        if (!roleId) return;
        await deleteRole(roleId);
        res.status(200).json({ success: true, message: "Role deleted successfully" });
    } catch (error) {
        next(error);
    }
};




export const getRoleAcessController = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const body: {
            roleId: number;
            action: string
            orgCode: string;
        } = req.body;

        const data = await getRoleAcesstService(body.orgCode, body.roleId, body.action);
        res.status(200).json({
            success: true,
            data
        });

    } catch (error) {
        next(error);
    }
};