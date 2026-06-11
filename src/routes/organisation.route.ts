import { Router } from "express";
import { OrganisationController } from "../controller/organisation.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();
const organisationController = new OrganisationController();

router.use(authMiddleware);
router.get("/getAllOrg", organisationController.getAllOrg.bind(organisationController));

export default router;