import { Router } from "express";
import { VehicleController } from "../controller/vehicle.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { permissionMiddleware } from "../middleware/permission.middleware";


const router = Router();
const vehicleController = new VehicleController();
const VEHICLE_PAGE_ID = 7;
router.use(authMiddleware);
router.use(permissionMiddleware(VEHICLE_PAGE_ID));

router.get("/getAllVehicles/:orgCode", vehicleController.getAllVehiclesByOrgCode.bind(vehicleController));
router.get("/getVehicleById/:id", vehicleController.getVehicleById.bind(vehicleController));
router.post("/createVehicle/", vehicleController.createVehicle.bind(vehicleController));
router.put("/updateVehicle/:id", vehicleController.updateVehicle.bind(vehicleController));
router.delete("/deleteVehicle/:id", vehicleController.deleteVehicle.bind(vehicleController));

export default router;