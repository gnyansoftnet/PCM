import { Request, Response, NextFunction } from "express";
import { RoleService } from "../service/role.service";
import { asyncHandler } from "../middleware/async-handler";


export class RoleController {
    private roleService: RoleService;

    constructor() {
        this.roleService = new RoleService();
    }

    async createRole(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { roleName, orgCode, createdBy } = req.body;

            const role = await this.roleService.createRole(roleName, orgCode, createdBy);
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

            const role = await this.roleService.updateRole(roleId, modifiedBy, roleName, orgCode);
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

            const result = await this.roleService.deleteRole(roleId);
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

            const role = await this.roleService.getRoleById(roleId);
            res.status(200).json({
                success: true,
                data: role,
            });
        } catch (error) {
            next(error);
        }
    }

    getAllRoles = asyncHandler(async (
        req: Request,
        res: Response
    ) => {

        const { page, limit, search } = req.query as {
            page?: string;
            limit?: string;
            search?: string;
        };

        const result = await this.roleService.getAllRoles({
            page: page ? parseInt(page) : 1,
            limit: limit ? parseInt(limit) : 10,
            search: search ?? "",
        });

        res.status(200).json({
            success: true,
            ...result,
        });
    });

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

            const result = await this.roleService.getRoleAccessService(orgCode, roleId, action);
            res.status(200).json({
                success: true,
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }
}