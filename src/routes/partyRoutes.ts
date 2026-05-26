import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";

import {
    saveParty,
    getPartyList,
    getPartyById,
    deleteParty
} from "../controller/partyController";

const router = express.Router();
router.use(authMiddleware);

router.post("/SaveParty", saveParty);

router.get("/GetPartyList", getPartyList);

router.get("/EditParty/:id", getPartyById);

router.delete("/DeleteParty/:id", deleteParty);

export default router;