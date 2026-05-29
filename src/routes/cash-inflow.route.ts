import { Router } from "express";
import { VehicleController } from "../controller/vehicle.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { permissionMiddleware } from "../middleware/permission.middleware";
import { CashInFlowController } from "../controller/cash-inflow.controller";


const router = Router();
const cashInflowController = new CashInFlowController();
const CASHINFLOW_PAGE_ID = 19;
// router.use(authMiddleware);
// router.use(permissionMiddleware(CASHINFLOW_PAGE_ID));

router.post("/saveUpdateDeleteCashInFlow", cashInflowController.saveUpdateDeleteCashInFlow.bind(cashInflowController));

export default router;