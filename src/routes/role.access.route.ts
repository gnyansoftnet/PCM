import { Router } from "express";
import {
    newRoleAccess,
    roleAccessByRoleId,
    roleMenuByRoleId,
    roleAccessAll
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
    "/menu-by-role",
    roleMenuByRoleId
);

router.post(
    "/all-access",
    roleAccessAll
);

export default router;