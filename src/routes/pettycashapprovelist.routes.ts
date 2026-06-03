// routes/pettycashapprovelist.routes.ts

import { Router } from "express";
import { PettyCashApproveListController } from "../controller/pettycashapprovelist.controller";

const router = Router();

router.post("/Approve-Confirm-list", PettyCashApproveListController.getList);
router.post("/update-status", PettyCashApproveListController.updateStatus);

export default router;