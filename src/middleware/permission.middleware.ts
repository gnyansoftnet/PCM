import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../config/database";
import { AppError } from "../utils/app.error";

export type PermissionAction = "READ" | "WRITE" | "UPDATE" | "DELETE";

const METHOD_PERMISSION_MAP: Record<string, PermissionAction> = {
    GET: "READ",
    POST: "WRITE",
    PUT: "UPDATE",
    DELETE: "DELETE",
};



export const permissionMiddleware = (pgId: number) => {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const userCode: string = (req as any).user?.userCode;
            const orgCode: string = (req as any).user?.orgCode;

            if (!userCode || !orgCode) {
                throw new AppError("Unauthorized: missing user context.", 401);
            }

            // Map HTTP method → DB column
            const action: PermissionAction = METHOD_PERMISSION_MAP[req.method];
            if (!action) {
                throw new AppError(`Unsupported HTTP method: ${req.method}`, 405);
            }

            // Query using User_Code + PG_Id + Org_Code
            const result = await AppDataSource.query(
                `SELECT \`${action}\` AS hasPermission
                 FROM tbl_01_m_p_useraccess
                 WHERE User_Code = ?
                 AND   PG_Id     = ?
                 AND   Org_Code  = ?
                 AND   Dflag     = 0
                 LIMIT 1`,
                [userCode, pgId, orgCode]
            );

            // No record found → no access configured
            if (!result || result.length === 0) {
                throw new AppError(
                    `Access not configured for user '${userCode}' on page '${pgId}'.`,
                    403
                );
            }

            // Check if the specific operation column is 1 or 0
            const hasPermission: boolean =
                result[0].hasPermission === 1 || result[0].hasPermission === true;

            if (!hasPermission) {
                throw new AppError(
                    `Permission denied: '${action}' operation not allowed on this page.`,
                    403
                );
            }

            next();
        } catch (error) {
            next(error);
        }
    };
};