import { Router } from "express";

import { DriverController } from "../controller/driver.controller";

import { authMiddleware } from "../middleware/auth.middleware";
import { permissionMiddleware } from "../middleware/permission.middleware";

const router = Router();

const driverController = new DriverController();

const DRIVER_PAGE_ID = 18;


router.use(authMiddleware);

router.use(permissionMiddleware(DRIVER_PAGE_ID));

router.post("/SaveDriver", driverController.createDriver.bind(driverController));

router.get("/GetDriverList", driverController.getAllDriversByOrgCode.bind(driverController));

router.get("/GetDriverById/:id", driverController.getDriverById.bind(driverController));

router.put("/UpdateDriver/:id", driverController.updateDriver.bind(driverController));

router.delete("/DeleteDriver/:id", driverController.deleteDriver.bind(driverController));

export default router;