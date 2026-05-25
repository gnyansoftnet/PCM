import { Router } from "express";

import {
    saveUserAccessData,
    userAccessByUserRole,
    userMenuAccess
} from "../controller/user.access.controller";

const router = Router();

// SAVE

router.post(
    "/save",
    saveUserAccessData
);
router.post(
    "/by-user-role",
    userAccessByUserRole
);
router.post(
    "/menu-access",
    userMenuAccess
);

export default router;