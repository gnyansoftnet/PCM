import { Router } from "express";
import {
    newRoleAccess,
    roleAccessByRoleId,
    roleMenuByRoleId,
    roleAccessAll,
    saveRoleAccessData
} from "../controller/role.access.controller";



const router = Router();

router.post(
    "/new-role",
    newRoleAccess
);

router.post(
    "/by-role-id",
    roleAccessByRoleId
);
router.post(
    "/by-role-id",
    roleAccessByRoleId
);
router.post(
    "/by-role-id",
    roleAccessByRoleId
);

router.post(
    "/menu-by-role",
    roleMenuByRoleId
);

router.post(
    "/all-access",
    roleAccessAll
);

router.post(
    "/save",
    saveRoleAccessData
);

export default router;