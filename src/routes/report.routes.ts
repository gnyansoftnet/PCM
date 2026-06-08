import { Router } from "express";
import ReportController from "../controller/report.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { permissionMiddleware } from "../middleware/permission.middleware";

const router = Router();
const reportController = new ReportController();
const APPROVE_PAGE_ID = 21;
router.use(authMiddleware);
router.use(permissionMiddleware(APPROVE_PAGE_ID));


router.post("/all", reportController.getReports.bind(reportController));


export default router;