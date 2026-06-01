import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { permissionMiddleware } from "../middleware/permission.middleware";
import { OtherExpensesController } from "../controller/other-expenses.controller";


const router = Router();
const otherExpensesController = new OtherExpensesController();
const OTHER_EXPENSES_PAGE_ID = 22;
router.use(authMiddleware);
router.use(permissionMiddleware(OTHER_EXPENSES_PAGE_ID));

router.post("/saveUpdateDeleteOtherExpenses", otherExpensesController.saveUpdateDeleteOtherExpenses.bind(otherExpensesController));
router.get("/getAllOtherExpensesByOrg/:orgCode", otherExpensesController.getAllOtherExpensesByOrg.bind(otherExpensesController));
router.get("/getOtherExpensesDetailsById", otherExpensesController.getOtherExpensesDetailsById.bind(otherExpensesController));

export default router;