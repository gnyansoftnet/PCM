import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { permissionMiddleware } from "../middleware/permission.middleware";
import { TripSettelmentController } from "../controller/trip-settelment.controller";


const router = Router();
const tripSettelmentController = new TripSettelmentController();
const CASHINFLOW_PAGE_ID = 12;
router.use(authMiddleware);
router.use(permissionMiddleware(CASHINFLOW_PAGE_ID));

router.post("/saveUpdateDeleteTripSettelment", tripSettelmentController.saveUpdateDeleteTripSettelment.bind(tripSettelmentController));
router.get("/getAllTripSettlement/:orgCode/:userCode", tripSettelmentController.getAllTripSettlement.bind(tripSettelmentController));
router.get("/getTripSettelmentPrintByVoucherNumber", tripSettelmentController.getTripSettelmentPrintByVoucherNumber.bind(tripSettelmentController));
router.get("/getTripSettelmentByVoucherNumber", tripSettelmentController.getTripSettelmentByVoucherNumber.bind(tripSettelmentController));

export default router;