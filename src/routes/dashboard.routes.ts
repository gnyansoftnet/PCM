import { Router } from "express";
import { dashboardAction } from "../controller/dashboard.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.post("/action", dashboardAction);

router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Dashboard Route Working"
    });
});

export default router;