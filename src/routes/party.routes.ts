import { Router } from "express";

import { PartyController } from "../controller/party.controller";

import { authMiddleware } from "../middleware/auth.middleware";

import { permissionMiddleware } from "../middleware/permission.middleware";

const router = Router();

const partyController = new PartyController();

const PARTY_PAGE_ID = 17;

/* ---------------- MIDDLEWARE ---------------- */

router.use(authMiddleware);

//router.use(permissionMiddleware(PARTY_PAGE_ID));

/* ---------------- PARTY ROUTES ---------------- */
router.post("/SaveParty", partyController.createParty.bind(partyController));

router.get("/GetPartyList", partyController.getPartyList.bind(partyController));

router.get("/GetPartyById/:id", partyController.getPartyById.bind(partyController));

router.put("/UpdateParty/:id", partyController.updateParty.bind(partyController));

router.delete("/DeleteParty/:id", partyController.deleteParty.bind(partyController));

export default router;