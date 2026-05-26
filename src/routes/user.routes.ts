import { Router } from "express";
import {
    createUserController,
    deleteUsersByIdController,
    getUsersByOrgCodeController,
    loginController,
    refreshTokenController,
    updateUserController,

} from "../controller/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { getUsersByOrgCode } from "../service/user.service";


const router = Router();

router.post("/loginUser", loginController);
router.post("/refreshToken", refreshTokenController);
router.post("/createUser", authMiddleware, createUserController);
router.get("/deleteUserById", authMiddleware, deleteUsersByIdController);
router.get("/getUsersByOrgCode/:orgCode", authMiddleware, getUsersByOrgCodeController);
router.put(
    "/updateUser/:userId",
    authMiddleware,
    updateUserController
);



export default router;