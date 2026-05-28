import { Router } from "express";
import { VehicleController } from "../controller/vehicle.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { permissionMiddleware } from "../middleware/permission.middleware";
import { PageModuleController } from "../controller/page-module.controller";


const router = Router();
const pageModuleController = new PageModuleController();
router.use(authMiddleware);
router.get("/getAllModules", pageModuleController.getVehicleById.bind(pageModuleController));
export default router;