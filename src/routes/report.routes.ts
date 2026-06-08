import { Router } from "express";
import ReportController from "../controller/Report.all.controller";

const router = Router();


router.post("/all", ReportController.getReports);


export default router;