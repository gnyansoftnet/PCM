import { Router } from "express";
import { VehicleController } from "../controller/vehicle.controller";
import { authMiddleware } from "../middleware/auth.middleware";


const router = Router();
const vehicleController = new VehicleController();

router.use(authMiddleware);

router.get("/getAllVehicles/:orgCode", vehicleController.getAllVehiclesByOrgCode.bind(vehicleController));
router.get("/getVehicleById/:id", vehicleController.getVehicleById.bind(vehicleController));
router.post("/createVehicle/", vehicleController.createVehicle.bind(vehicleController));
router.put("/updateVehicle/:id", vehicleController.updateVehicle.bind(vehicleController));
router.delete("/deleteVehicle/:id", vehicleController.deleteVehicle.bind(vehicleController));

export default router;