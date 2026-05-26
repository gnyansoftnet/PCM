import { Request, Response, NextFunction } from "express";
import { RoleService } from "../service/role.service";

const roleService = new RoleService();

export class RoleController {

    async createRole(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { roleName, orgCode, createdBy } = req.body;

            const role = await roleService.createRole(roleName, orgCode, createdBy);
            res.status(201).json({
                success: true,
                message: "Role created successfully.",
                data: role,
            });
        } catch (error) {
            next(error);
        }
    }

    async updateRole(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const roleId = parseInt(req.params.id as string);
            if (isNaN(roleId)) {
                res.status(400).json({ success: false, message: "Invalid role ID." });
                return;
            }

            const { modifiedBy, roleName, orgCode } = req.body;

            const role = await roleService.updateRole(roleId, modifiedBy, roleName, orgCode);
            res.status(200).json({
                success: true,
                message: "Role updated successfully.",
                data: role,
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteRole(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const roleId = parseInt(req.params.id as string);
            if (isNaN(roleId)) {
                res.status(400).json({ success: false, message: "Invalid role ID." });
                return;
            }

            const result = await roleService.deleteRole(roleId);
            res.status(200).json({
                success: true,
                message: result,
            });
        } catch (error) {
            next(error);
        }
    }

    async getRoleById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const roleId = parseInt(req.params.id as string);
            if (isNaN(roleId)) {
                res.status(400).json({ success: false, message: "Invalid role ID." });
                return;
            }

            const role = await roleService.getRoleById(roleId);
            res.status(200).json({
                success: true,
                data: role,
            });
        } catch (error) {
            next(error);
        }
    }

    async getAllRoles(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const roles = await roleService.getAllRoles();
            res.status(200).json({
                success: true,
                count: roles.length,
                data: roles,
            });
        } catch (error) {
            next(error);
        }
    }

    async getRoleAccess(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const orgCode = req.params.orgCode as string;
            if (!orgCode) {
                res.status(400).json({ success: false, message: "orgCode is required." });
                return;
            }

            const roleId = parseInt(req.params.roleId as string);
            if (isNaN(roleId)) {
                res.status(400).json({ success: false, message: "Invalid role ID." });
                return;
            }

            const action = req.params.action as string;
            if (!action) {
                res.status(400).json({ success: false, message: "action is required." });
                return;
            }

            const result = await roleService.getRoleAccessService(orgCode, roleId, action);
            res.status(200).json({
                success: true,
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }
}