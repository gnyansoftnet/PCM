import { Router } from "express";
import { RoleController } from "../controller/role.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { permissionMiddleware } from "../middleware/permission.middleware";

const router = Router();
const roleController = new RoleController();
const ROLE_PAGE_ID = 8; 

router.use(authMiddleware);
router.use(permissionMiddleware(ROLE_PAGE_ID));

router.get("/getAllRoles", roleController.getAllRoles.bind(roleController));
router.get("/getRoleById/:id", roleController.getRoleById.bind(roleController));
router.get("/getRoleAccess/:orgCode/:roleId/:action", roleController.getRoleAccess.bind(roleController));
router.post("/createRole", roleController.createRole.bind(roleController));
router.put("/updateRole/:id", roleController.updateRole.bind(roleController));
router.delete("/deleteRole/:id", roleController.deleteRole.bind(roleController));

export default router;