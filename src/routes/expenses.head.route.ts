import { Router } from "express";
import { VehicleController } from "../controller/vehicle.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { permissionMiddleware } from "../middleware/permission.middleware";
import { RouteController } from "../controller/route.controller";
import { ExpensesHeadController } from "../controller/expenses-head.controller";


const router = Router();
const headController = new ExpensesHeadController();
const HEAD_PAGE_ID = 17;
router.use(authMiddleware);
router.use(permissionMiddleware(HEAD_PAGE_ID));

router.get("/getAllExpenses", headController.getAllExpensesHeadsByOrgCode.bind(headController));
router.get("/getByExpensesId/:id", headController.getExpensesHeadById.bind(headController));
router.post("/createExpenses", headController.createExpensesHead.bind(headController));
router.put("/updateExpenses/:id", headController.updateExpensesHead.bind(headController));
router.delete("/deleteExpenses/:id", headController.deleteExpensesHead.bind(headController));

export default router;