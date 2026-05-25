import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../config/database";
import { AppError } from "../utils/app.error";
import { METHOD_PERMISSION_MAP, PermissionAction } from "../utils/permission.types";


 
export const permissionMiddleware = (pgId: number) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userCode: string = (req as any).user?.userCode;
            const orgCode: string = (req as any).user?.orgCode;

            if (!userCode || !orgCode) {
                throw new AppError("Unauthorized: missing user context.", 401);
            }

            // Map HTTP method → DB column name
            const action: PermissionAction = METHOD_PERMISSION_MAP[req.method];
            if (!action) {
                throw new AppError(`Unsupported HTTP method: ${req.method}`, 405);
            }

            // Query the exact column (READ / WRITE / UPDATE / DELETE)
            const result = await AppDataSource.query(
                `SELECT \`${action}\` as hasPermission
                 FROM tbl_01_m_p_useraccess
                 WHERE User_Code = ?
                 AND   PG_Id     = ?
                 AND   Org_Code  = ?
                 AND   Dflag     = 0
                 LIMIT 1`,
                [userCode, pgId, orgCode]
            );

            if (!result || result.length === 0) {
                throw new AppError(
                    `No access record found for user '${userCode}' on page '${pgId}'.`,
                    403
                );
            }

            const hasPermission: boolean =
                result[0].hasPermission === 1 || result[0].hasPermission === true;

            if (!hasPermission) {
                throw new AppError(
                    `Permission denied: '${action}' not allowed on page '${pgId}'.`,
                    403
                );
            }

            next();
        } catch (error) {
            next(error);
        }
    };
};