import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { permissionMiddleware } from "../middleware/permission.middleware";
import { UserController } from "../controller/user.controller";


const router = Router();
const userController = new UserController();
const VEHICLE_PAGE_ID = 7;
router.use(authMiddleware);
router.use(permissionMiddleware(VEHICLE_PAGE_ID));

router.get("/getUsersByOrgCode/:orgCode", userController.getUsersByOrgCode.bind(userController));
router.get("/getVehicleById/:id", userController.getUserById.bind(userController));
router.post("/createUser", userController.createUser.bind(userController));
router.put("/updateUser/:userId", userController.updateUser.bind(userController));
router.delete("/deleteUserById/:id", userController.deleteUser.bind(userController));

export default router;