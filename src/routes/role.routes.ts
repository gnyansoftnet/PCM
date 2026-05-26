import { Router } from "express";
import {
    createRoleController,
    deleteRoleController,
    getAllRolesController,
    getRoleAcessController,
    getRoleByIdController,
    updateRoleController,
    validateCreateRole,
    validateUpdateRole
} from "../controller/role.controller";
import { authMiddleware } from "../middleware/auth.middleware";


const router = Router();



router.post("/createRole",
    authMiddleware,
    validateCreateRole,
    createRoleController
);
router.put("/updateRole",
    authMiddleware,
    validateUpdateRole,
    updateRoleController
);
router.get(
    "/roleById/:roleId",
    authMiddleware,
    getRoleByIdController
);
router.get(
    "/getAllRoles",
    authMiddleware,
    getAllRolesController
);
router.delete(
    "/deleteRole/:roleId",
    authMiddleware,
    deleteRoleController
);

router.get(
    "/getRoleAcess",
    authMiddleware,
    getRoleAcessController
);
export default router;