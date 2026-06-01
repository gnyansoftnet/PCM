import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { dashboardActionController } from "../controller/dashboard.controller";

const router = Router();

router.use(authMiddleware);

router.post("/action", dashboardActionController);

router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Dashboard Route Working"
    });
});

export default router;