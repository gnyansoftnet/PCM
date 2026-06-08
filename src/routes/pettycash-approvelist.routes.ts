// routes/pettycashapprovelist.routes.ts

import { Router } from "express";
import { PettyCashApproveListController } from "../controller/pettycash-approvelist.controller";
import { permissionMiddleware } from "../middleware/permission.middleware";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();
const pettyCashApproveListController = new PettyCashApproveListController();
const APPROVE_PAGE_ID = 20;
router.use(authMiddleware);
router.use(permissionMiddleware(APPROVE_PAGE_ID));

router.post("/Approve-Confirm-list", pettyCashApproveListController.getPettyCashApproveList.bind(pettyCashApproveListController));
router.post("/update-status", pettyCashApproveListController.updateStatus.bind(pettyCashApproveListController));

export default router;