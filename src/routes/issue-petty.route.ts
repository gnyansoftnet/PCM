import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { permissionMiddleware } from "../middleware/permission.middleware";
import { IssuePettyController } from "../controller/issue-petty.controller";


const router = Router();
const issuePettyController = new IssuePettyController();
const CASHINFLOW_PAGE_ID = 11;
router.use(authMiddleware);
router.use(permissionMiddleware(CASHINFLOW_PAGE_ID));

router.post("/saveUpdateDeleteIssuePetty", issuePettyController.saveUpdateDeleteIssuePetty.bind(issuePettyController));
router.get("/getAllIssuesPettty/:orgCode/:userCode", issuePettyController.getAllIssuesPettty.bind(issuePettyController));
router.get("/getIssuePettyByVoucherNumber", issuePettyController.getIssuePettyByVoucherNumber.bind(issuePettyController));
router.get("/getIssuePettyPrintByVoucherNumber", issuePettyController.getIssuePettyPrintByVoucherNumber.bind(issuePettyController));
router.post("/getPartyByRoutes", issuePettyController.getPartyByRoutes.bind(issuePettyController));

export default router;