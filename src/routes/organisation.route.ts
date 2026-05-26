import { Router } from "express";
import { OrganisationController } from "../controller/organisation.controller";

const router = Router();
const organisationController = new OrganisationController();


router.get("/getAllOrg", organisationController.getAllOrg.bind(organisationController));

export default router;